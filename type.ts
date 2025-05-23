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
  category_id: string;
  category_name: string;
  type: "BLOG" | "ARTICLE";
  status: "PUBLIC" | "PRIVATE";
}

// 포스트 작성 폼 (기본 포스트 정보)
export interface IPostForm extends IPostBase {}

// 전체 포스트 정보 (기본 포스트 정보 + 상세 필드)
export interface IPost extends IPostBase {
  post_id: string;
  comments: number;
  like: number;
  dislike: number;
  is_created: boolean;
  updated_at: string | undefined;
  is_kor: string;
  is_eng: string;
  created_at: string;
}

// 포스트 카드 (간략한 포스트 정보)
export interface IPostCard extends Omit<IPostBase, "content"> {
  post_id: string;
  comments: number;
  updated_at: string;
  created_at: string;
  is_kor: string;
  is_eng: string;
}

// 메인 포스트 (일반 포스트 정보)
export interface IMainPost extends Omit<IPostBase, "content" | "status"> {
  post_id: string;
  comments: number;
  updated_at: string;
  created_at: string;
  is_kor: string;
  is_eng: string;
}

// 서브 포스트 (제목, 서브제목, 콘텐츠만 포함)
export interface ISubPost
  extends Omit<IPostBase, "thumbnail" | "thumbnail_alt" | "category_name"> {
  post_id: string;
  is_created: boolean;
}

// 카드 형태의 포스트 (카테고리 포함)
export interface IMainPostCard extends IPostCard {
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
  created_at: string;
  comments: number;
  type: string;
}
