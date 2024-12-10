"use client";
import React, { useCallback, useState } from "react";
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
import { CommentForm } from "@/type";

const CommentArea = () => {
  const [accordianState, setAccordianState] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { id } = useParams();
  const handleAccordianChange = (state: string) => {
    setAccordianState(state);
  };

  const onChangeComment = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCommentContent(e.target.value);
    },
    [commentContent]
  );

  const onSubmitComment = async () => {
    setLoading(true);
    if (session) {
      const email = session.user?.email;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/getuser?email=${email}`
      );
      const currentUser = await response.json();
      const newComment: CommentForm = {
        user_id: currentUser.user_id,
        user_avatar: currentUser.avatar,
        user_username: currentUser.username,
        post_id: id as string,
        content: commentContent,
        like: 0,
        dislike: 0,
        date: new Date(),
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
      setLoading(false);
      setCommentContent("");
      setAccordianState("");
      if (!postCommentResponse.ok) {
        setLoading(false);
      } else {
      }
    }
  };

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        onValueChange={handleAccordianChange}
        value={accordianState}
      >
        <AccordionItem value="open">
          <AccordionTrigger>
            {accordianState === "" && "What are your thoughts?"}
          </AccordionTrigger>

          <AccordionContent className="mb-20">
            <Textarea
              className="focus:border-2 focus:border-slate-500 border-2  focus-visible:ring-0"
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
