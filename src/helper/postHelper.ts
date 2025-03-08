import {
  IMainPost,
  IMainPostCard,
  IPost,
  IPostCard,
  ISubPost,
  ISubPostCard,
} from "@/type";

export const postFormatting = (
  mainPost: IMainPost,
  subPost: ISubPost
): IPost => {
  const post: IPost = {
    post_id: mainPost.post_id,
    title: subPost.title,
    subtitle: subPost.subtitle,
    thumbnail_alt: mainPost.thumbnail_alt,
    status: mainPost.status,
    comments: mainPost.comments,
    thumbnail: mainPost.thumbnail,
    content: subPost.content,
    like: 0,
    dislike: 0,
    created_at: mainPost.created_at,
    category_id: subPost.category_id,
    category_name: mainPost.category_name,
    updated_at: mainPost.updated_at,
    is_updated: mainPost.is_updated,
    type: mainPost.type,
    is_kor: mainPost.is_kor,
    is_eng: mainPost.is_eng,
    is_created: subPost.is_created,
  };
  return post;
};

export const postCardFormatting = (
  mainPosts: IMainPostCard[],
  subPosts: ISubPostCard[]
): IPostCard[] => {
  const posts: IPostCard[] = [];
  for (let i = 0; i < mainPosts.length; i++) {
    if (mainPosts[i].post_id === subPosts[i].post_id) {
      const mainPost = mainPosts[i];
      const subPost = subPosts[i];
      const post: IPostCard = {
        post_id: mainPost.post_id,
        thumbnail: mainPost.thumbnail,
        thumbnail_alt: mainPost.thumbnail_alt,
        status: mainPost.status,
        comments: mainPost.comments,
        created_at: mainPost.created_at,
        updated_at: mainPost.updated_at,
        is_updated: mainPost.is_updated,
        category_name: mainPost.category_name,
        category_id: mainPost.category_id,
        type: mainPost.type,
        title: subPost.title,
        subtitle: subPost.subtitle,
        is_kor: mainPost.is_kor,
        is_eng: mainPost.is_eng,
      };
      posts.push(post);
    }
  }
  return posts;
};
