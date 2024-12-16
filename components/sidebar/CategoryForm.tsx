"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { CategoryForm, Category } from "@/type";
import { createCategoryAction } from "@/app/action/categoryAction";

const CategoryFormComp = ({
  category,
  onChangeCreateStatus,
  from,
}: {
  category?: Category;
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
      ...(category && { ...category }),
    },
  });

  const handleSubmit = async (data: CategoryForm) => {
    if (category) {
      // update
    } else {
      // create
      await createCategoryAction(data);
      onChangeCreateStatus(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 py-5 rounded-sm"
      onSubmit={onSubmit(handleSubmit)}
    >
      <Input
        className="h-7"
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
