"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { CategoryForm, Category, ServerActionResponse } from "@/type";
import { createCategoryAction } from "@/src/app/action/categoryAction";
import { useSession } from "next-auth/react";
import { useError } from "@/src/context/ErrorContext";
const CategoryFormComp = ({
  category,
  onChangeCreateStatus,
  from,
}: {
  category?: Category;
  onChangeCreateStatus: (a: boolean) => void;
  from: string;
}) => {
  //Variable Declaration
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
  const { data: session } = useSession();
  const { setError } = useError();

  //Client Component Event Handler && Trigger Server action
  const handleSubmit = async (data: CategoryForm) => {
    // create
    if (String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID) {
      const serverResponse: ServerActionResponse = await createCategoryAction(
        data
      );
      if (serverResponse.state.status === false) {
        setError(new Error(serverResponse.state.error));
      }
    } else {
      setError(new Error("Error test"));
    }
    onChangeCreateStatus(false);
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
