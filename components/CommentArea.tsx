"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Comment } from "@/type";

const CommentArea = () => {
  const [accordianState, setAccordianState] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const { data: session } = useSession();
  const { id } = useParams();
  console.log(id);
  const handleAccordianChange = (state: string) => {
    setAccordianState(state);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };
  const onSubmitComment = async () => {
    if (session) {
      const email = session.user?.email;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/getuser?email=${email}`
      );
      const currentUser = await response.json();
      const newComment: Comment = {
        user_id: currentUser.user_id,
        post_id: id as string,
        content: commentContent,
      };
      const postCommentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );
      console.log(postCommentResponse);
    }
  };

  return (
    <div>
      <label>Response</label>
      <Accordion
        type="single"
        collapsible
        onValueChange={handleAccordianChange}
      >
        <AccordionItem value="open">
          <AccordionTrigger>
            {accordianState === "" && "What are your thoughts?"}
          </AccordionTrigger>
          <AccordionContent className="mb-20">
            <Textarea
              onChange={onChangeComment}
              value={commentContent}
              placeholder="What are your thoughts? "
            />
            <div className="flex items-center float-right gap-5 mt-5">
              <AccordionTrigger className="border-2 w-20 text-center flex rounded-md h-10 bor justify-center border-gray-500">
                Cancel
              </AccordionTrigger>
              <Button onClick={onSubmitComment} className="w-20 h-10">
                Save
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CommentArea;
