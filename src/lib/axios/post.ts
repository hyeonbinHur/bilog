import { axiosInstance } from "./axiosUtils";
import { IPost, IPostForm } from "@/type";

const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("blog");
    return response.data;
  } catch (err) {
    console.log("Error fetching posts:", err);
    throw err;
  }
};
const getOnePost = async (id: string) => {
  try {
    const response = await axiosInstance.get(`blog/${id}`);
    return response.data[0];
  } catch (err) {
    console.log("Error get one post", err);
    throw err;
  }
};
const createPost = async (newPost: IPostForm) => {
  try {
    const response = await axiosInstance.post("blog", newPost);
    return response.data;
  } catch (err) {
    console.log("error while creating new post", err);
    throw err;
  }
};
const updatePost = async (newPost: IPost, id: string) => {
  try {
    const response = await axiosInstance.put(`blog/${id}`, newPost);
    return response.data;
  } catch (err) {
    console.log("error while updating data", err);
    throw err;
  }
};
const deletePost = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`blog/${id}`);
    return response.data;
  } catch (err) {
    console.log("error while deletign data", err);
    throw err;
  }
};
const searchPost = async (title: string) => {
  try {
    const response = await axiosInstance.get(`blog/search?q=${title}`);
    const posts = await response.data;
    return posts;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  searchPost,
};
