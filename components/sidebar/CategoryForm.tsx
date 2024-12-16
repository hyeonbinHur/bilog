"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { CategoryForm } from "@/type";
import { createCategoryAction } from "@/app/action/categoryAction";

const CategoryFormComp = ({
  onChangeCreateStatus,
  from,
}: {
  onChangeCreateStatus: (a: boolean) => void;
  from: string;
}) => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { isSubmitting },
  } = useForm<CategoryForm>({
    mode: "onSubmit",
    defaultValues: {
      category_type: from,
    },
  });

  const handleSubmit = async (data: CategoryForm) => {
    await createCategoryAction(data);
    onChangeCreateStatus(false);
  };

  return (
    <form
      className="flex flex-col gap-5 py-5 rounded-sm"
      onSubmit={onSubmit(handleSubmit)}
    >
      <Input
        type="text"
        placeholder="new category name"
        {...register("category_name")}
      />

      <div className="flex justify-start gap-2">
        <Button
          disabled={isSubmitting}
          onClick={() => onChangeCreateStatus(false)}
          className="rounded-sm h-7 text-xs bg-white border-2 text-stone-400 border-stone-400 hover:bg-stone-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-sm h-7 text-xs"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CategoryFormComp;
