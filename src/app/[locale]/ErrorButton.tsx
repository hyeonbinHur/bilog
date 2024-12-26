"use client";

import { Button } from "@/src/components/ui/button";
import { notFound } from "next/navigation";
import React from "react";

const ErrorButton = () => {
  const onClickGenError = () => {
    throw new Error("Gen Error");
  };
  const onClickToNotFound = () => {
    notFound();
  };
  // 렌더링 전에 에러가 발생하는 경우
  return (
    <div>
      <Button onClick={() => onClickGenError()}>Generate error</Button>
      <Button onClick={() => onClickToNotFound()}>to not found</Button>
    </div>
  );
};

export default ErrorButton;
