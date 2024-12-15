import { Session } from "next-auth";

export interface ILink {
  label: string;
  href: string;
}

export interface IPostBase {
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
}
export interface IPostForm extends IPostBase {}
export interface IPost extends IPostBase {
  post_id: string;
  comments: number;
  like: number;
  dislike: number;
  createdAt: Date;
  updatedAt: Date | undefined;
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
}

export interface IExtendedSession extends Session {
  user: {
    id: string;
  };
}
