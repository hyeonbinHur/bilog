import { Session } from "next-auth";

export interface ILink {
  label: string;
  href: string;
}

export interface IUser {
  name: string;
  email: string;
  image: string;
}

export type PostType = "BLOG" | "ARTICLE";
export type PostStatus = "PUBLIC" | "PRIVATE";

// 기본 포스트 정보 (공통 필드)
export interface IPostBase {
  title: string;
  subtitle: string;
  thumbnail: string;
  thumbnail_alt: string;
  content: string;
  category_id: string;
  category_name: string;
  type: PostType;
  status: PostStatus;
  comments: number;
  created_at: Date;
  updated_at: Date | null;
  is_kor: PostStatus;
  is_eng: PostStatus;
  storagePath: string;
}

// 메인 포스트 (posts 테이블)
export interface IMainPost {
  post_id: string;
  thumbnail: string;
  thumbnail_alt: string;
  category_id: string;
  category_name: string;
  type: PostType;
  comments: number;
  created_at: Date;
  updated_at: Date | null;
  is_kor: PostStatus;
  is_eng: PostStatus;
  storagePath: string;
}

// 서브 포스트 (post_kor, post_eng 테이블)
export interface ISubPost {
  post_id: string;
  title: string;
  subtitle: string;
  content: string;
  status: PostStatus;
}

// 포스트 작성 폼 (기본 포스트 정보)
export interface IPostForm
  extends Omit<
    IPostBase,
    "created_at" | "updated_at" | "comments" | "is_kor" | "is_eng"
  > {}

// 전체 포스트 정보 (기본 포스트 정보 + 상세 필드)
export interface IPost extends IPostBase {
  post_id: string;
  like: number;
  dislike: number;
  updated_at: Date | null;
  created_at: Date;
  storagePath: string;
}

// API 응답 포스트 (kor_post, eng_post 포함)
export interface IPostWithSubPosts {
  kor_post: IPost;
  eng_post: IPost;
}

// 포스트 카드 (간략한 포스트 정보)
export interface IPostCard extends Omit<IPostBase, "content"> {
  post_id: string;
  updated_at: Date | null;
  created_at: Date;
  is_kor: PostStatus;
  is_eng: PostStatus;
}

// 카드 형태의 포스트 (카테고리 포함)
export interface IMainPostCard extends Omit<IPostCard, "category_name"> {
  category_name: string;
}

// 서브 포스트 카드 (기본 정보만)
export interface ISubPostCard
  extends Pick<
    IPostBase,
    "title" | "subtitle" | "category_id" | "type" | "status"
  > {
  post_id: string;
}

export interface IPostUpdate {
  thumbnail: string;
  thumbnail_alt: string;
  category_id: string;
  category_name: string;
  updated_at: Date;
  title: string;
  subtitle: string;
  content: string;
  is_kor?: "PUBLIC" | "PRIVATE";
  is_eng?: "PUBLIC" | "PRIVATE";
  storagePath: string;
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

export interface ServerActionResponse {
  state: {
    status: boolean;
    error: string;
  };
}

export interface RelatedPost {
  post_id: string;
  title: string;
  created_at: string;
  comments: number;
  type: string;
}

export interface CommentBase {
  user_id: string;
  user_image: string;
  user_username: string;
  post_id: string;
  content: string;
  like: number;
  dislike: number;
  created_at: Date;
}

export interface CommentForm extends Omit<CommentBase, "date"> {}

export interface CommentUpdate
  extends Omit<
    CommentBase,
    "user_id" | "user_image" | "user_username" | "post_id" | "created_at"
  > {}

export interface Comment extends CommentBase {
  comment_id: string;
  updated_at: string | undefined;
}
