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
  post_id: number;
  like: number;
}

export interface Comment {
  user_id: string;
  user_avatar: string;
  user_username: string;

  post_id: string;
  content: string;
  like: number;
  dislike: number;
  date: Date;
}
