import { supabase } from "../supabaseClient";

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
  customFileName?: string;
};

export async function uploadImage({
  file,
  bucket,
  folder,
  customFileName,
}: UploadProps) {
  const finalFileName = `${customFileName}`;

  const path = `${folder ? folder + "/" : ""}${finalFileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    return { data: null, error, url: null };
  }
  
  console.log("Upload success:", path, file.size, "bytes");

  // Get the public URL for the uploaded file
  const { data: urlData } = await supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return { url: urlData.publicUrl, error: null };
}
