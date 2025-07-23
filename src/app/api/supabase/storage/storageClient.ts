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
  const finalFileName = `${customFileName}.webp`;
  const path = `${folder ? folder + "/" : ""}${finalFileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file);

  if (error) {
    console.log(error);
    return { data: null, error, url: null };
  }

  // Get the public URL for the uploaded file
  const { data: urlData } = await supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return { url: urlData.publicUrl, error: null };
}
