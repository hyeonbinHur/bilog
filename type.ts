export interface ILink {
  label: string;
  href: string;
}

export interface IPost {
  title: string;
  content: string;
}

export interface IPostForm {
  title: string;
  thumbnail: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
}
