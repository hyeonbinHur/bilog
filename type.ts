import { Session } from "next-auth";

export interface ILink {
  label: string;
  href: string;
}

export interface IPostBase {
  title: string;
  subtitle: string;
  thumbnail: string;
  thumbnail_alt: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
  category_id: string;
  category_name: string;

  type: "BLOG" | "ARTICLE";
}
export interface IPostForm extends IPostBase {}

export interface IPost extends IPostBase {
  post_id: string;
  comments: number;
  like: number;
  dislike: number;
  createdAt: Date;
  updatedAt: Date | undefined;
  isUpdated: boolean;
}

export interface CommentBase {
  user_id: string;
  user_avatar: string;
  user_username: string;
  post_id: string;
  content: string;
  like: number;
  dislike: number;
  date: Date;
}

export interface CommentForm extends CommentBase {}

export interface Comment extends CommentBase {
  comment_id: string;
  isUpdated: boolean;
  updatedAt: Date | undefined;
}

export interface CategoryBase {
  category_name: string;
  category_type: string;
}
export interface CategoryForm extends CategoryBase {}
export interface Category extends CategoryBase {
  category_id: number;
}

export interface IExtendedSession extends Session {
  user: {
    id: string;
  };
}

export interface RelatedPost {
  post_id: string;
  title: string;
  createdAt: string;
  comments: number;
  type: string;
}
