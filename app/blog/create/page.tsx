"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
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
import { resizePostImage, convertBase64ToImage } from "@/helper/imageHelper";
import { editorConfig } from "@/helper/editorHelper";

const page = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { isSubmitting },
  } = useForm<IPostForm>({
    mode: "onSubmit",
  });

  const [image, setImage] = useState<string>("");
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorChange = (content: string) => {
    console.log(content);
  };

  const handleSubmit = (data: IPostForm) => {
    setTimeout(() => {}, 3000);
    console.log(data);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizeImage = (await resizePostImage(file)) as string;
        if (!resizeImage.startsWith("data:")) {
          console.error("Invalid Base64 data URI");
          return;
        }
        const newFile = convertBase64ToImage(resizeImage, "re");
        setImage(URL.createObjectURL(newFile));
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
            onChange={(e) => handleFileChange(e)}
          />
        </section>
        <section>
          <img src={image} />
        </section>

        <section>
          <Label>Content</Label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API}
            id="my-custom-editor-id"
            init={editorConfig}
            onInit={(e, editor) => (editorRef.current = editor)}
            onEditorChange={handleEditorChange}
          />
        </section>
        <section>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        <Button type="submit" disabled={isSubmitting}>
          저장
        </Button>
      </form>
    </div>
  );
};

export default page;
