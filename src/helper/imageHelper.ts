import imageCompression, { Options } from "browser-image-compression";
import { uploadFileToS3 } from "./awsHelper";

// Blob을 File로 변환하는 함수
const convertBlobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type });
};

// 이미지 리사이징 함수
export const resizePostImage = async (file: File): Promise<File> => {
  const options: Options = {
    useWebWorker: true,
    maxSizeMB: 1,
    fileType: "image/webp",
  };
  try {
    const compressedBlob: Blob = await imageCompression(file, options);
    const compressedFile: File = convertBlobToFile(
      compressedBlob,
      file.name.replace(/\.[^/.]+$/, ".webp")
    );
    return compressedFile; // 리사이즈된 파일 반환
  } catch (error) {
    console.error("이미지 리사이징 실패:", error);
    throw error;
  }
};

// export const resizePostImage = (file: File) =>
//   new Promise((res) => {
//     Resizer.imageFileResizer(
//       file,
//       1600,
//       1600,
//       "webp",
//       100,
//       0,
//       (uri) => res(uri),
//       "file"
//     );
//   });

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
        const awsURL = await uploadFileToS3(resizedImage, title);
        img.src = awsURL; // 이미지 src 업데이트
      }
    }
  }
  const updatedHTML = doc.documentElement.outerHTML;
  return updatedHTML;
};
