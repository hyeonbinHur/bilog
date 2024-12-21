"use server";

import { IPost, IPostForm } from "@/type";
import { revalidateTag } from "next/cache";

export const createPostAction = async (post: IPostForm, lang: string) => {
  // title: string;
  // thumbnail: string;
  // thumbnail_alt: string;
  // content: string;
  // status: "PRIVATE" | "PUBLIC";

  try {
    if (!post.title) {
      throw new Error("post tile is required");
    }
    if (!post.thumbnail) {
      throw new Error("post thumbnail is required");
    }
    if (!post.thumbnail_alt) {
      throw new Error("post thumbnail_alt is required");
    }
    if (!post.content) {
      throw new Error("post content is required");
    }
    if (!post.status) {
      throw new Error("post status is required");
    }

    const newPost = {
      title: post.title,
      subtitle: post.subtitle,
      thumbnail: post.thumbnail,
      thumbnail_alt: post.thumbnail_alt,
      content: post.content,
      status: post.status,
      createdAt: new Date(),
      category_id: post.category_id,
      category_name: post.category_name,
      type: post.type,
      isKOR: false,
      isENG: false,
    };
    if (lang === "Korean") {
      newPost.isKOR = true;
    } else {
      newPost.isENG = true;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`, {
      method: "POST",
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("Unknown Error occured");
    }

    const responseData = await response.json();
    const insertedId = responseData.insertedId;

    console.log("Inserted Post ID:", insertedId);
    revalidateTag(`post-list`);
    return {
      state: {
        status: true,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error while creating post : ${err}`,
      },
    };
  }
};

export const deletePostAction = async (post_id: string) => {
  try {
    if (!post_id) {
      throw new Error("Post id is required");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("unknown error occured");
    }

    revalidateTag(`post-list`);
    return {
      state: {
        status: true,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error white delete post : ${err}`,
      },
    };
  }
};

export const updatePostAction = async (post: Partial<IPost>) => {
  //   title: string;
  //   thumbnail: string;
  //   thumbnail_alt: string;
  //   content: string;
  //   status: "PRIVATE" | "PUBLIC";
  //   post_id: string;
  //   like: number;
  //   dislike: number;
  try {
    if (!post.post_id) {
      throw new Error("post is is required");
    }

    const updatedPost = {
      ...post,
      updatedAt: new Date(),
      isUpdated: true,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.post_id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedPost),
      }
    );
    if (!response.ok) {
      throw new Error("unknown error is occurud");
    }
    revalidateTag(`post-${post.post_id}`);
    return {
      state: {
        status: true,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error whlie update post : ${err}`,
      },
    };
  }
};
