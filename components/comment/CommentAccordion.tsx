"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommentArea from "./CommentArea";

const CommentAccordion = ({ comments }: { comments: number }) => {
  const [accordianState, setAccordianState] = useState("");

  const formRef = useRef<{
    submit: () => void;
    pending: boolean;
    state: any;
  }>(null);

  const handleAccordianChange = (state: string) => {
    setAccordianState(state);
  };

  const onSubmitComment = async () => {
    formRef.current?.submit();
  };

  const handlePendingChange = (submitStatus: boolean) => {
    if (submitStatus === true) {
      console.log(submitStatus);
      setAccordianState("");
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
            <CommentArea
              ref={formRef}
              onPendingChange={handlePendingChange}
              comments={comments}
            />
            <div className="flex items-center float-right gap-5 mt-5">
              <AccordionTrigger className="border-2 w-20 text-center flex rounded-md h-10 bor justify-center border-gray-500">
                Cancel
              </AccordionTrigger>

              <Button
                disabled={formRef.current?.pending}
                onClick={onSubmitComment}
                className="w-20 h-10"
              >
                {formRef.current?.pending ? "Saving..." : "Save"}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CommentAccordion;
