"use client";

import { IPost } from "@/type";
import { usePostForm } from "../../../hooks/usePostForm";
import { Button } from "../../ui/button";
import { FormBasicFields } from "./FormBasicFields";
import { FormContentEditor } from "./FormContentEditor";
import { FormMetaFields } from "./FormMetaFields";
import { FormThumbnailSection } from "./FormThumbnailSection";

const PostForm = ({ post, lang }: { post?: IPost; lang: string }) => {
  const { form, state, handlers } = usePostForm(lang, post);

  return (
    <div>
      <form
        className="flex flex-col gap-6 mb-52"
        onSubmit={form.handleSubmit(handlers.handleSubmit)}
      >
        <FormBasicFields register={form.register} disabled={!!post} />

        <FormThumbnailSection
          register={form.register}
          image={state.image}
          onImageChange={handlers.handleThumbnailChange}
        />

        <FormContentEditor control={form.control} getValues={form.getValues} />

        <FormMetaFields
          control={form.control}
          setValue={form.setValue}
          categories={state.categories}
        />

        <Button type="submit" disabled={state.isSubmitting}>
          {lang} version
        </Button>
      </form>
    </div>
  );
};

export default PostForm;
