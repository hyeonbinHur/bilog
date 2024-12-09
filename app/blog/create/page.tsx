"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPostForm } from "@/type";
import { resizePostImage, optimizeHTMLImage } from "@/helper/imageHelper";
import { editorConfig } from "@/helper/editorHelper";
import { uploadFileToS3 } from "@/helper/awsHelper";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/lib/axios/post";

const page = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { isSubmitting },
    getValues,
    control,
  } = useForm<IPostForm>({
    mode: "onSubmit",
    defaultValues: {
      status: "PRIVATE",
    },
  });

  const { mutate: mutateCreatePost } = useMutation({
    mutationFn: (newPost: IPostForm) => {
      console.log("Hello create post");
      return createPost(newPost);
    },
    onSuccess: () => {
      console.log("post is uploaded successfully");
    },
  });

  const [image, setImage] = useState<string>("");
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleSubmit = async (data: IPostForm) => {
    data.content = await optimizeHTMLImage(data.content, data.title);
    if (thumbnailFile instanceof File) {
      data.thumbnail = await uploadFileToS3(thumbnailFile, data.title);
    }
    mutateCreatePost(data);
  };

  const handleThumbNailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizeImage = (await resizePostImage(file)) as File;
        // file 형태로 보관
        setThumbnailFile(resizeImage);
        // 해당 file의 url을 추출하여, 프리뷰로 보여줌
        setImage(URL.createObjectURL(resizeImage));
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-6 mb-52"
        onSubmit={onSubmit(handleSubmit)}
      >
        <section>
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
            required
          />
        </section>

        <section>
          <Label>Thumbnail</Label>
          <Input
            type="file"
            {...register("thumbnail")}
            required
            accept="image/*"
            onChange={(e) => handleThumbNailChange(e)}
          />
          <Input
            type="text"
            placeholder="Thumbnail alt"
            {...register("thumbnail_alt")}
            required
          />
        </section>

        <section>
          <img src={image} />
        </section>

        <section>
          <Label>Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API}
                id="my-custom-editor-id"
                init={editorConfig}
                onInit={(e, editor) => (editorRef.current = editor)}
                onEditorChange={(newValue) => field.onChange(newValue)}
                value={getValues("content")}
              />
            )}
          />
        </section>

        <section>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Set Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          저장
        </Button>
      </form>
    </div>
  );
};

export default page;
