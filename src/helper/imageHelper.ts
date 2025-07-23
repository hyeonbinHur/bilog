import imageCompression, { Options } from "browser-image-compression";
import { uploadImage } from "../app/api/supabase/storage/storageClient";

// Blob을 File로 변환하는 함수
const convertBlobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

// 이미지 리사이징 함수
// 이미지 리사이징 함수
// 수정된 이미지 리사이징 함수 (maxWidth: 1000px만 제한)
export const resizePostImage = async (file: File): Promise<File> => {
  const options: Options = {
    useWebWorker: true,
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    fileType: "image/webp",
    initialQuality: 1,
    alwaysKeepResolution: false,
  };

  try {
    // 원본 이미지 크기 확인
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
      img.onload = async () => {
        const originalWidth = img.width;
        const originalHeight = img.height;

        // 가로만 1000px 제한 (높이는 비율에 따라 자동 조정)
        if (originalWidth > 1000) {
          const ratio = 1000 / originalWidth;
          const targetWidth = 1000;
          const targetHeight = Math.round(originalHeight * ratio);

          // Canvas를 사용한 수동 리사이즈
          const resizedFile = await manualResize(
            file,
            targetWidth,
            targetHeight
          );
          resolve(resizedFile);
        } else {
          try {
            const compressedBlob: Blob = await imageCompression(file, {
              ...options,
              maxWidthOrHeight: undefined, // 크기 제한 제거
              alwaysKeepResolution: true, // 해상도 유지
            });
            const compressedFile: File = convertBlobToFile(
              compressedBlob,
              file.name.replace(/\.[^/.]+$/, ".webp")
            );
            resolve(compressedFile);
          } catch (error) {
            reject(error);
          }
        }
        URL.revokeObjectURL(imageUrl);
      };

      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error("이미지 로드 실패"));
      };

      img.src = imageUrl;
    });
  } catch (error) {
    throw error;
  }
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
      // Canvas 크기 설정
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 고품질 렌더링 설정
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // 이미지 그리기
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

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

export const optimizeHTMLImage = async (htmlString: string, title: string) => {
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
          folder: `/${title}`,
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
