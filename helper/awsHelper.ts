import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS as string,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS as string,
  },
});

export const uploadFileToS3 = async (
  image: File,
  postTitle: string
): Promise<string> => {
  if (!image) {
    return "https://bilog-hb.s3.us-east-1.amazonaws.com/upload/profile-picture.png";
  }
  const params = {
    Bucket: "bilog-hb",
    Key: `post/${postTitle}/${image.name}`,
    Body: image,
    ACL: "public-read" as ObjectCannedACL,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://bilog-hb.s3.us-east-1.amazonaws.com/${params.Key}`;
  return url;
};
