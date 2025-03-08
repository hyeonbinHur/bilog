import { Session } from "next-auth";

export interface ILink {
  label: string;
  href: string;
}

// 기본 포스트 정보 (공통 필드)
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

// 포스트 작성 폼 (기본 포스트 정보)
export interface IPostForm extends IPostBase {}

// 전체 포스트 정보 (기본 포스트 정보 + 상세 필드)
export interface IPost extends IPostBase {
  post_id: string;
  comments: number;
  like: number;
  dislike: number;
  creeated_at: string;
  updated_at: string | undefined;
  is_updated: boolean;
  is_kor: boolean | number;
  is_eng: boolean | number;
  created_at: string;
}

// 포스트 카드 (간략한 포스트 정보)
export interface IPostCard extends Omit<IPostBase, "content"> {
  post_id: string;
  comments: number;
  is_updated: boolean;
  updated_at: string;
  creeated_at: string;
  is_kor: boolean | number;
  is_eng: boolean | number;
}

// 메인 포스트 (일반 포스트 정보)
export interface IMainPost extends Omit<IPostBase, "content"> {
  post_id: string;
  comments: number;
  is_updated: boolean;
  updated_at: string;
  creeated_at: string;
  is_kor: boolean | number;
  is_eng: boolean | number;
}

// 서브 포스트 (제목, 서브제목, 콘텐츠만 포함)
export interface ISubPost {
  post_id: string;
  title: string;
  subtitle: string;
  content: string;
  category_id: string;
  type: "BLOG" | "ARTICLE";
  is_created: boolean;
}

// 카드 형태의 포스트 (카테고리 포함)
export interface IMainPostCard extends IPostCard {
  category_name: string;
}

// 서브 포스트 카드 (기본 정보만)
export interface ISubPostCard
  extends Pick<IPostBase, "title" | "subtitle" | "category_id" | "type"> {
  post_id: string;
}

export interface CommentBase {
  User_id: string;
  user_avatar: string;
  user_username: string;
  post_id: string;
  content: string;
  like: number;
  dislike: number;
  date: string | Date;
}

export interface CommentForm extends Omit<CommentBase, "date"> {}

export interface Comment extends CommentBase {
  comment_id: string;
  is_updated: boolean;
  updated_at: string | undefined;
}

export interface CategoryBase {
  category_name: string;
  category_type: string;
}
export interface CategoryForm extends CategoryBase {}

export interface Category extends CategoryBase {
  Category_id: number;
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
  creeated_at: string;
  comments: number;
  type: string;
}
