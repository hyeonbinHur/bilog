"use client";
import React from "react";
import { useState } from "react";

import {
  S3Client,
  PutObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";

const page = () => {
  const [image, setImage] = useState<File>();
  //s3 config
  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS as string,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS as string,
    },
  });
  const uploadFile = async () => {
    if (!image) {
      return "https://bilog-hb.s3.us-east-1.amazonaws.com/upload/profile-picture.png";
    }
    const params = {
      Bucket: "bilog-hb",
      Key: `upload/${image.name}`,
      Body: image,
      ACL: "public-read" as ObjectCannedACL,
      ContentType: "image/jpeg",
    };
    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
      const url = `https://bilog-hb.s3.us-east-1.amazonaws.com/${params.Key}`;
      return url;
    } catch (err) {
      console.error("Upload error:", err);
      return false;
    }
  };

  const handleUpload = async () => {
    const awsURL = await uploadFile();
    console.log(awsURL);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
      <button onClick={() => handleUpload()}> s3 업로드 </button>
    </div>
  );
};

export default page;
