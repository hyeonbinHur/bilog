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
    createdAt: mainPost.createdAt,
    category_id: subPost.category_id,
    category_name: mainPost.category_name,
    updatedAt: mainPost.updatedAt,
    isUpdated: mainPost.isUpdated,
    type: mainPost.type,
    isKOR: mainPost.isKOR,
    isENG: mainPost.isENG,
    isCreated: subPost.isCreated,
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
        createdAt: mainPost.createdAt,
        updatedAt: mainPost.updatedAt,
        isUpdated: mainPost.isUpdated,
        category_name: mainPost.category_name,
        category_id: mainPost.category_id,
        type: mainPost.type,
        title: subPost.title,
        subtitle: subPost.subtitle,
        isKOR: mainPost.isKOR,
        isENG: mainPost.isENG,
      };
      posts.push(post);
    }
  }
  return posts;
};
