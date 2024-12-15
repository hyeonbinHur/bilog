"use client";

import { IPost, IPostForm } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

import type { Editor as TinyMCEEditor } from "tinymce";
import { optimizeHTMLImage, resizePostImage } from "@/helper/imageHelper";
import { uploadFileToS3 } from "@/helper/awsHelper";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { editorConfig } from "@/helper/editorHelper";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createPostAction, updatePostAction } from "@/app/action/postAction";

const PostForm = ({
  post,
  onChangeEditState,
}: {
  post?: IPost;
  onChangeEditState?: (a: boolean) => void;
}) => {
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
      ...(post && { ...post }),
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
    if (post) {
      //update post
      await updatePostAction(data);
    } else {
      //create post
      await createPostAction(data);
      // 끝난후 blog페이지로
    }
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

  useEffect(() => {
    if (post?.thumbnail) {
      // post에서 thumbnail을 받아왔을 경우 미리보기 설정
      setImage(post.thumbnail);
    }
  }, [post?.thumbnail]);

  return (
    <div>
      {onChangeEditState && (
        <Button
          onClick={() => onChangeEditState(false)}
          className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-400 hover:text-stone-700 active:translate-y-0.5 "
        >
          Edit
        </Button>
      )}

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
                onEditorChange={(newValue) => {
                  field.onChange(newValue);
                }}
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

export default PostForm;
