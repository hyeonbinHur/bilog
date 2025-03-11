"use client";
import { useTranslations } from "next-intl";
import React, { useState, useRef } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import CommentArea from "./CommentArea";
import { Loader } from "lucide-react";

const CommentAccordion = ({ comments }: { comments: number }) => {
  // Variable declaration
  const [accordianState, setAccordianState] = useState("");

  const formRef = useRef<{
    submit: () => void;
    pending: boolean;
    state: any;
  }>(null);
  const t = useTranslations("Comment");

  //Client Component EventHandler
  const handleAccordianChange = (state: string) => {
    setAccordianState(state);
  };
  const onSubmitComment = async () => {
    formRef.current?.submit();
  };
  const handlePendingChange = (submitStatus: boolean) => {
    if (submitStatus === true) {
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
            {accordianState === "" && t("YourOpinion")}
          </AccordionTrigger>
          <AccordionContent className="mb-20">
            <CommentArea
              ref={formRef}
              onPendingChange={handlePendingChange}
              comments={comments}
            />
            <div className="flex items-center float-right gap-5 mt-5">
              <AccordionTrigger className="border-2 w-20 text-center flex rounded-md h-10 bor justify-center border-gray-500">
                {t("Cancel")}
              </AccordionTrigger>
              <Button
                disabled={formRef.current?.pending}
                onClick={onSubmitComment}
                className="w-20 h-10"
              >
                {formRef.current?.pending ? <Loader /> : t("Save")}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CommentAccordion;
