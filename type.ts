export interface ILink {
  label: string;
  href: string;
}

export interface IPost {
  post_id: number;
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
  like: number;
}

export interface IPostForm {
  title: string;
  thumbnail: string;
  thumbnail_alt: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
}
