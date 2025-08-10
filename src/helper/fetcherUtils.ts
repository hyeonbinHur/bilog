// src/helper/fetcherUtils.ts

import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import { authOptions } from "../lib/authOption";

export const getPosts = async (
  from: string,
  path: string,
  page: number,
  options?: {
    searchParams?: string;
    category_id?: string;
  }
) => {
  try {
    let mainEndPoint = "";
    const session = await getServerSession(authOptions);
    const headers: Record<string, string> = {
      "X-Request-Name": "getPosts",
      "X-Request-Type": from,
    };
    if (session?.user?.id) headers["User-Id"] = session.user.id;
    const locale = await getLocale();
    if (from === "main") {
      mainEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}/post?type=${path}&page=${page}&locale=${locale}`;
    } else if (from === "search" && options?.searchParams) {
      mainEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?q=${options.searchParams}&type=${path}&page=${page}&locale=${locale}`;
    } else if (from === "category" && options?.category_id) {
      mainEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${options.category_id}?type=${path}&page=${page}&locale=${locale}`;
    }

    const mainResponse = await fetch(mainEndPoint, {
      next: { tags: [`post-all`] },
      headers,
      cache: "no-store",
    });

    if (!mainResponse.ok) {
      throw new Error("Failed to read posts");
    }

    const data = await mainResponse.json();
    return { posts: data.posts, totalCount: data.totalCount };
  } catch (err) {
    throw err;
  }
};

export const getCategories = async (from: string) => {
  try {
    const endPoint = `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`;

    const response = await fetch(endPoint, {
      next: { tags: [`category-${from}`] },
      headers: {
        "X-Request-Name": "getCategories",
        "X-Request-Type": from,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const result = await response.json();

    return result.data;
  } catch (err) {
    throw err;
  }
};

export const getCategoryById = async (categoryId: string) => {
  try {
    const mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryId}`;
    const mainResponse = await fetch(mainSql, {
      next: { tags: [`post-all`] },
    });
    if (!mainResponse.ok) {
      throw new Error("Error while reading category data");
    }
    const result = await mainResponse.json();
    const category = result.data;
    return category;
  } catch (err) {
    throw err;
  }
};

export const getPostById = async (postId: string) => {
  try {
    const mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}`;
    const mainResponse = await fetch(mainSql, {
      next: { tags: [`post`] },
    });
    if (!mainResponse.ok) {
      throw new Error("Error while get Post");
    }
    const result = await mainResponse.json();
    return result;
  } catch (err) {
    throw err;
  }
};
