import {
  createPostAction,
  updatePostAction,
} from "@/src/app/action/postAction";
import { uploadImage } from "@/src/app/api/supabase/storage/storageClient";
import { useError } from "@/src/context/ErrorContext";
import { optimizeHTMLImage, resizePostImage } from "@/src/helper/imageHelper";
import { Category, IPost, IPostForm, ServerActionResponse } from "@/type";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const usePostForm = (lang: string, post?: IPost) => {
  const path = usePathname();
  const type = path.includes("blog") ? "BLOG" : "ARTICLE";
  const nextPath = path.includes("blog") ? "blog" : "article";

  const form = useForm<IPost>({
    mode: "onSubmit",
    defaultValues: {
      status: "PRIVATE",
      ...(post && { ...post }),
    },
  });

  const [image, setImage] = useState<string | undefined>(post?.thumbnail);
  const [thumbnailFile, setThumbnailFile] = useState<File>();
  const [categories, setCategories] = useState<Category[]>([]);

  const { setError } = useError();
  const router = useRouter();

  const validateFormData = (data: IPost): boolean => {
    return !!(data.content && data.title && data.storagePath);
  };

  const handleThumbnailUpload = async (data: IPost): Promise<void> => {
    if (!(thumbnailFile instanceof File)) return;

    const { url, error } = await uploadImage({
      file: thumbnailFile,
      bucket: "posts",
      folder: `/${data.storagePath}`,
      customFileName: thumbnailFile.name,
    });

    if (error) {
      throw new Error(`Thumbnail upload failed: ${error}`);
    }

    data.thumbnail = url!;
  };

  const handleServerResponse = (serverResponse: ServerActionResponse): void => {
    if (serverResponse.state.status === false) {
      setError(new Error(serverResponse.state.error));
    } else {
      router.push(`/${nextPath}`);
    }
  };

  const updateExistingPost = async (data: IPost): Promise<void> => {
    const serverResponse = await updatePostAction(data, lang);
    handleServerResponse(serverResponse);
  };

  const createNewPost = async (data: IPost): Promise<void> => {
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
      storagePath: data.storagePath,
    };

    const serverResponse = await createPostAction(postForm, lang);
    handleServerResponse(serverResponse);
  };

  const handleSubmit = async (data: IPost): Promise<void> => {
    if (!validateFormData(data)) {
      return;
    }
    try {
      data.content = await optimizeHTMLImage(data.content, data.storagePath);

      await handleThumbnailUpload(data);

      if (post) {
        await updateExistingPost(data);
      } else {
        await createNewPost(data);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    }
  };

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizeImage = (await resizePostImage(file)) as File;
        setThumbnailFile(resizeImage);
        setImage(URL.createObjectURL(resizeImage));
      } catch (error) {
        console.error("Error processing file:", error);
      }
    }
  };

  const setEnglishContent = (content: string) => {
    form.setValue('content', content);
  };

  const setKoreanContent = (content: string) => {
    form.setValue('content', content);
  };

  const getKoreanContent = (): string => {
    return form.getValues('content') || '';
  };

  const getEnglishContent = (): string => {
    return form.getValues('content') || '';
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${type}`,
        { next: { tags: [`category-${type}`] } }
      );
      if (categoryResponse.ok) {
        const result = await categoryResponse.json();
        setCategories(result.data);
      }
    };
    fetchCategories();
  }, [type]);

  useEffect(() => {
    if (post) {
      form.reset({ ...post });
    }
  }, [post, form.reset]);

  return {
    form: {
      register: form.register,
      control: form.control,
      handleSubmit: form.handleSubmit,
      getValues: form.getValues,
      setValue: form.setValue,
      formState: form.formState,
    },
    state: {
      image,
      categories,
      isSubmitting: form.formState.isSubmitting,
    },
    handlers: {
      handleSubmit,
      handleThumbnailChange,
      setEnglishContent,
      setKoreanContent,
      getKoreanContent,
      getEnglishContent,
    },
    type,
  };
};
