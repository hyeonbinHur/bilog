import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "ap-northeast-2",
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
    return "https://bilog-s3.s3.ap-northeast-2.amazonaws.com/upload/profile-picture.png";
  }
  console.log(image.name);
  const params = {
    Bucket: "bilog-s3",
    Key: `post/${postTitle}/${image.name}`,
    Body: image,
    ACL: "public-read" as ObjectCannedACL,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  const url = `https://bilog-s3.s3.ap-northeast-2.amazonaws.com/${params.Key}`;
  return url;
};
