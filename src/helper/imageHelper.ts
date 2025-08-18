import { uploadImage } from "../app/api/supabase/storage/storageClient";

// Blob을 File로 변환하는 함수
const convertBlobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

// 이미지 리사이징 함수
// 이미지 리사이징 함수
// 수정된 이미지 리사이징 함수 (maxWidth: 1000px만 제한)
export const resizePostImage = async (file: File): Promise<File> => {
  console.log("Original file:", file.name, file.size, file.type);

  return new Promise((resolve, reject) => {
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas context 생성 실패"));
        return;
      }

      // 가로 1000px 제한 체크
      let targetWidth = img.width;
      let targetHeight = img.height;

      if (img.width > 1000) {
        // 비율 계산하여 크기 조정
        const ratio = 1000 / img.width;
        targetWidth = 1000;
        targetHeight = Math.round(img.height * ratio);
      }

      // Canvas 크기 설정
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 고품질 렌더링 설정 (해상도 유지를 위해)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 이미지 그리기 (크기 조정)
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // WebP로 변환 (고품질)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              { type: "image/webp" }
            );
            console.log(
              `Resized: ${img.width}x${img.height} → ${targetWidth}x${targetHeight} WebP (${webpFile.size} bytes)`
            );
            resolve(webpFile);
          } else {
            reject(new Error("WebP 변환 실패"));
          }
        },
        "image/webp",
        1 // 고품질 (1.0은 때때로 과도할 수 있음)
      );

      URL.revokeObjectURL(imageUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("이미지 로드 실패"));
    };

    img.src = imageUrl;
  });
};

// Canvas를 사용한 정밀한 수동 리사이즈
const manualResize = (
  file: File,
  targetWidth: number,
  targetHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas context 생성 실패"));
      return;
    }
    img.onload = () => {
      // 단계적 다운샘플링으로 품질 향상
      let currentWidth = img.width;
      let currentHeight = img.height;
      let currentCanvas = document.createElement("canvas");
      let currentCtx = currentCanvas.getContext("2d")!;

      // 원본 이미지를 첫 번째 캔버스에 그리기
      currentCanvas.width = currentWidth;
      currentCanvas.height = currentHeight;
      currentCtx.drawImage(img, 0, 0);

      // 50% 이상 축소할 때만 단계적 리사이징 적용
      while (
        currentWidth > targetWidth * 2 ||
        currentHeight > targetHeight * 2
      ) {
        const newWidth = Math.max(targetWidth, Math.floor(currentWidth * 0.5));
        const newHeight = Math.max(
          targetHeight,
          Math.floor(currentHeight * 0.5)
        );

        const newCanvas = document.createElement("canvas");
        const newCtx = newCanvas.getContext("2d")!;
        newCanvas.width = newWidth;
        newCanvas.height = newHeight;

        // 고품질 렌더링 설정
        newCtx.imageSmoothingEnabled = true;
        newCtx.imageSmoothingQuality = "high";

        newCtx.drawImage(currentCanvas, 0, 0, newWidth, newHeight);

        currentCanvas = newCanvas;
        currentCtx = newCtx;
        currentWidth = newWidth;
        currentHeight = newHeight;
      }

      // 최종 리사이즈
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(currentCanvas, 0, 0, targetWidth, targetHeight);

      // WebP로 변환
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              { type: "image/webp" }
            );

            resolve(resizedFile);
          } else {
            reject(new Error("WebP 변환 실패"));
          }
        },
        "image/webp",
        1
      );
    };

    img.onerror = () => {
      reject(new Error("이미지 로드 실패"));
    };

    img.src = URL.createObjectURL(file);
  });
};

export const convertBase64ToImage = (dataurl: string, fileName: string) => {
  let arr = dataurl.split(",");
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error("Invalid Base64 data URL: MIME type not found");
  }
  const mime = mimeMatch[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], fileName, { type: mime });
  return new File([u8arr], fileName, { type: mime });
};

export const optimizeHTMLImage = async (
  htmlString: string,
  storagePath: string
) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgElements = Array.from(doc.getElementsByTagName("img"));
  for (const img of imgElements) {
    if (img.src.startsWith("data:image")) {
      // base64 이미지 src를 file 형태로 변경
      const file = convertBase64ToImage(img.src, img.alt);

      // 바꾼 file을 최적화 (크기 줄이기)
      const resizedImage = await resizePostImage(file);
      if (resizedImage instanceof File) {
        // AWS에 업로드
        const { url, error } = await uploadImage({
          file: resizedImage,
          bucket: "posts",
          folder: `/${storagePath}`,
          customFileName: `${resizedImage.name}`,
        });
        // const awsURL = await uploadFileToS3(resizedImage, title);
        img.src = url!; // 이미지 src 업데이트
      }
    }
  }
  const updatedHTML = doc.documentElement.outerHTML;
  return updatedHTML;
};
