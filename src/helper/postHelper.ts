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
    comments: mainPost.comments,
    thumbnail: mainPost.thumbnail,
    content: subPost.content,
    like: 0,
    dislike: 0,
    created_at: mainPost.created_at,
    category_id: mainPost.category_id,
    category_name: mainPost.category_name,
    updated_at: mainPost.updated_at,
    type: mainPost.type,
    is_kor: mainPost.is_kor,
    is_eng: mainPost.is_eng,
    //  : subPost.is_created,
    status: subPost.status,
  };
  return post;
};

export const postCardFormatting = (
  mainPosts: IMainPostCard[],
  subPosts: ISubPostCard[]
): IPostCard[] => {
  const posts: IPostCard[] = [];

  for (let i = 0; i < mainPosts.length; i++) {
    for (let j = 0; j < subPosts.length; j++) {
      if (mainPosts[i].post_id === subPosts[j].post_id) {
        const mainPost = mainPosts[i];
        const subPost = subPosts[j];
        const post: IPostCard = {
          post_id: mainPost.post_id,
          thumbnail: mainPost.thumbnail,
          thumbnail_alt: mainPost.thumbnail_alt,
          comments: mainPost.comments,
          created_at: mainPost.created_at,
          updated_at: mainPost.updated_at,
          category_name: mainPost.category_name,
          category_id: mainPost.category_id,
          type: mainPost.type,
          title: subPost.title,
          subtitle: subPost.subtitle,
          is_kor: mainPost.is_kor,
          is_eng: mainPost.is_eng,
          status: subPost.status,
        };
        posts.push(post);
      }
    }
  }
  return posts;
};
