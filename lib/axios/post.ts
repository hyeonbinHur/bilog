import axios from "axios";
import { axiosInstance } from "./axiosUtils";
import { Post } from "@/type";

const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get("post");
    return response.data;
  } catch (err) {
    console.log("Error fetching posts:", err);
    throw err;
  }
};
const getOnePost = async (id: string) => {
  try {
    const response = await axiosInstance.get(`post/${id}`);
    return response.data;
  } catch (err) {
    console.log("Error get one post", err);
    throw err;
  }
};
const createPost = async (newPost: Post) => {
  try {
    const response = await axiosInstance.post("post", newPost);
    return response.data;
  } catch (err) {
    console.log("error while creating new post", err);
    throw err;
  }
};
const updatePost = async (newPost: Post, id: string) => {
  try {
    const response = await axiosInstance.put(`post/${id}`, newPost);
    return response.data;
  } catch (err) {
    console.log("error while updating data", err);
    throw err;
  }
};
const deletePost = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`post/${id}`);
    return response.data;
  } catch (err) {
    console.log("error while deletign data", err);
    throw err;
  }
};

export { getAllPosts, getOnePost, createPost, updatePost, deletePost };
