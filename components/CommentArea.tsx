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

const CommentArea = () => {
  const [accordianState, setAccordianState] = useState("");
  const handleAccordianChange = (state: string) => {
    setAccordianState(state);
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
            <Textarea placeholder="What are your thoughts? " />
            <div className="flex items-center float-right gap-5 mt-5">
              <AccordionTrigger className="border-2 w-20 text-center flex rounded-md h-10 bor justify-center border-gray-500">
                Cancel
              </AccordionTrigger>
              <Button className="w-20 h-10">Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CommentArea;
