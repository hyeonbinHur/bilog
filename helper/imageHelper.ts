import Resizer from "react-image-file-resizer";
export const resizePostImage = (file: File) =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      500,
      0,
      (uri) => res(uri),
      "base64"
    );
  });

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

  return new File([u8arr], fileName, { type: mime });
};
