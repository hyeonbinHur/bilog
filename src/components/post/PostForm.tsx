"use client";

import {
  createPostAction,
  updatePostAction,
} from "@/src/app/action/postAction";
import { uploadImage } from "@/src/app/api/supabase/storage/storageClient";
import { useError } from "@/src/context/ErrorContext";
import { optimizeHTMLImage, resizePostImage } from "@/src/helper/imageHelper";
import { Category, IPost, IPostForm, ServerActionResponse } from "@/type";
import { Label } from "@radix-ui/react-label";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { Editor as TinyMCEEditor } from "tinymce";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const HashContainer = dynamic(() => import("../hash/HashContainer"), {
  ssr: false,
  loading: () => <div>태그 로딩 중...</div>,
});

const EditorWrapper = dynamic(() => import("../Common/EditorWrapper"), {
  ssr: false,
  loading: () => <div>에디터 로딩 중...</div>,
});

const PostForm = ({ post, lang }: { post?: IPost; lang: string }) => {
  //Variable Declaration
  const path = usePathname();
  const type = path.includes("blog") ? "BLOG" : "ARTICLE";
  const nextPath = path.includes("blog") ? "blog" : "article";

  const {
    register,
    handleSubmit: onSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
    control,
    reset,
  } = useForm<IPost>({
    mode: "onSubmit",
    defaultValues: {
      status: "PRIVATE",
      ...(post && { ...post }),
    },
  });

  const [image, setImage] = useState<string | undefined>(post?.thumbnail);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { setError } = useError();
  const router = useRouter();

  //Client Component Event Handler && Trigger Server action
  const handleSubmit = async (data: IPost) => {
    if (!data.content || !data.title) {
      return;
    }
    data.content = await optimizeHTMLImage(data.content, data.title);
    if (thumbnailFile instanceof File) {
      // data.thumbnail = await uploadFileToS3(thumbnailFile, data.title);
      const { url, error } = await uploadImage({
        file: thumbnailFile,
        bucket: "posts",
        folder: `/${data.title}`,
        customFileName: thumbnailFile.name,
      });
      if (error) {
        // Todo: some error handling is required
      }
      data.thumbnail = url!;
    }
    if (post) {
      //update post
      /**
       *
       */
      const serverResponse: ServerActionResponse = await updatePostAction(
        data,
        lang
      );
      if (serverResponse.state.status === false) {
        setError(new Error(serverResponse.state.error));
      } else {
        router.push(`/${nextPath}`);
      }
    } else {
      // create post
      const postForm: IPostForm = {
        title: data.title,
        subtitle: data.subtitle,
        thumbnail: data.thumbnail,
        thumbnail_alt: data.thumbnail_alt,
        content: data.content,
        status: data.status,
        category_id: data.category_id,
        category_name: data.category_name,
        type: type,
      };

      const serverResponse: ServerActionResponse = await createPostAction(
        postForm,
        lang
      );
      if (serverResponse.state.status === false) {
        setError(new Error(serverResponse.state.error));
      } else {
        router.push(`/${nextPath}`);
      }
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
    reset({
      status: "PRIVATE",
      ...(post && { ...post }), // post 값이 변경되면 useForm을 리셋
    });
  }, [post, reset]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${type}`,
        { next: { tags: [`category-${type}`] } }
      );
      if (!categoryResponse.ok) {
        return <div>error</div>;
      }
      const result = await categoryResponse.json();
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <form
        className="flex flex-col gap-6 mb-52"
        onSubmit={onSubmit(handleSubmit)}
      >
        <section>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Title"
            {...register("title")}
            required
          />
        </section>

        <section>
          <Label>Subtitle</Label>
          <Input
            type="text"
            placeholder="Subtitle"
            {...register("subtitle")}
            required
          />
        </section>

        <section>
          <Label>Thumbnail</Label>

          <Input
            className="mb-2"
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
        {image && (
          <section>
            <Image
              alt="thumbnail preview"
              width={100}
              height={100}
              src={image}
            />
          </section>
        )}

        <section>
          <Label>Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <EditorWrapper
                apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API!}
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
          <Label>Category</Label>
          {categories && (
            <Controller
              name="category_id"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? field.value.toString() : ""}
                  onValueChange={(value) => {
                    field.onChange(value);
                    // 선택된 category_id에 해당하는 category_name 찾기
                    const selectedCategory = categories.find(
                      (category) => category.category_id.toString() === value
                    );
                    if (selectedCategory) {
                      // category_name을 업데이트
                      setValue("category_name", selectedCategory.category_name);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Set Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {categories.map((e) => (
                        <SelectItem
                          value={e.category_id.toString()}
                          key={e.category_id}
                        >
                          {e.category_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </section>

        <section>
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Set Category" />
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

        <section>
          <Label>Tags</Label>
          <HashContainer />
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {lang} version
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
