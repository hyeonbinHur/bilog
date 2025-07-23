// "use client";

// import { uploadImage } from "@/src/app/api/supabase/storage/storageClient";
// import { resizePostImage } from "@/src/helper/imageHelper";
// import Image from "next/image";
// import { useRef, useState, useTransition, type ChangeEvent } from "react";

// export const UploadImageTest = () => {
//   const [imageUrls, setImageUrls] = useState<string | null>(null);
//   const [imageFile, setImageFile] = useState<File | undefined>();
//   const imageInputRef = useRef<HTMLInputElement>(null);
//   const [isPending, startTransition] = useTransition();

//   const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.[0]) {
//       const file = e.target.files?.[0];

//       const resizeImage = (await resizePostImage(file)) as File;
//       setImageFile(resizeImage);
//       setImageUrls(URL.createObjectURL(resizeImage));
//     }
//   };

//   const handleClickUploadImageButton = async () => {
//     startTransition(async () => {
//       const { data, error, url } = await uploadImage({
//         file: imageFile,
//         bucket: "posts",
//         folder: "test7",
//         customFileName: "my-test-image", // or use any name you want
//       });

//       if (error) {
//         console.log("Upload error:", error);
//       } else {
//         console.log("Upload successful:", data);
//         console.log("Image URL:", url);
//       }
//     });
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         hidden
//         ref={imageInputRef}
//         onChange={handleImageChange}
//       />
//       <button
//         className="bg-slate-600 py-2 w-40 rounded-lg"
//         onClick={() => imageInputRef.current?.click()}
//       >
//         select
//       </button>
//       <div className="flex gap-4">
//         {imageUrls && (
//           <div>
//             <Image
//               key={imageUrls}
//               src={imageUrls}
//               width={300}
//               height={300}
//               alt={`img`}
//             />
//           </div>
//         )}
//       </div>

//       <div className="flex gap-2">
//         <button
//           className="bg-slate-300 py-2 w-40 rounded-lg"
//           onClick={handleClickUploadImageButton}
//         >
//           Upload Image
//         </button>
//       </div>
//     </div>
//   );
// };
