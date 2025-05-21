// src/helper/fetcherUtils.ts

import type { Category } from "@/type";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOption";
import { getLocale } from "next-intl/server";

export const getPosts = async (
  from: string,
  path: string,
  page: number,
  params?: string,
  category_id?: string
) => {
  try {
    // URL 구성

    let mainSql = "";
    const session = await getServerSession(authOptions);
    const headers: Record<string, string> = {
      "X-Request-Name": "getPosts",
      "X-Request-Type": from,
    };
    if (session?.user?.id) headers["User-Id"] = session.user.id;
    const locale = await getLocale();

    if (from === "main") {
      mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post?type=${path}&page=${page}&locale=${locale}`;
    } else if (from === "search") {
      mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?q=${params}&type=${path}&page=${page}&locale=${locale}`;
    } else if (from === "category") {
      mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${category_id}?type=${path}&page=${page}&locale=${locale}`;
    }

    const mainResponse = await fetch(mainSql, {
      next: { tags: [`post-all`] },
      headers,
      cache: "no-store",
    });
    console.log(`[getPosts] end   at ${new Date().toISOString()}`);

    if (!mainResponse.ok) {
      throw new Error("Failed to read posts");
    }

    const data = await mainResponse.json();
    return { posts: data.posts, totalCount: data.totalCount };
  } catch (err) {
    console.error("getPosts error:", err);
    throw err;
  }
};

export const getCategories = async (from: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`;

    console.log(`[getCategories] start at ${new Date().toISOString()}`);
    const response = await fetch(url, {
      next: { tags: [`category-${from}`] },
      headers: {
        "X-Request-Name": "getCategories",
        "X-Request-Type": from,
      },
      cache: "no-store",
    });
    console.log(`[getCategories] end   at ${new Date().toISOString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const result: Category[] = await response.json();
    return result;
  } catch (err) {
    console.error("getCategories error:", err);
    throw err;
  }
};
