import type { CommentBase, CommentUpdate } from "@/type";
import { supabase } from "../supabase/supabaseClient";

export const commentService = {
  async getPostComments(post_id: string) {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post_id);
    
    if (error) {
      throw new Error(`댓글 조회 실패: ${error.message}`);
    }
    
    return {
      success: true,
      message: "댓글 목록을 성공적으로 조회했습니다.",
      data: data
    };
  },

  async createComment(newComment: CommentBase) {
    const { data, error } = await supabase
      .from("comments")
      .insert({
        user_id: newComment.user_id,
        user_image: newComment.user_image,
        user_username: newComment.user_username,
        post_id: newComment.post_id,
        content: newComment.content,
        like: 0,
        dislike: 0,
        created_at: new Date(),
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`댓글 생성 실패: ${error.message}`);
    }
    
    return {
      success: true,
      message: "댓글이 성공적으로 생성되었습니다.",
      data: data
    };
  },

  async updateComment(commentId: string, updateData: CommentUpdate) {
    const { data, error } = await supabase
      .from("comments")
      .update({
        content: updateData.content,
        like: updateData.like,
        dislike: updateData.dislike,
      })
      .eq("comment_id", commentId)
      .select()
      .single();
    
    if (error) {
      throw new Error(`댓글 업데이트 실패: ${error.message}`);
    }
    
    return {
      success: true,
      message: "댓글이 성공적으로 업데이트되었습니다.",
      data: data
    };
  },

  async deleteComment(comment_id: string) {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("comment_id", comment_id)
      .select()
      .single();

    if (error) {
      throw new Error(`댓글 삭제 실패: ${error.message}`);
    }
    
    return {
      success: true,
      message: "댓글이 성공적으로 삭제되었습니다.",
      data: data
    };
  },
};
