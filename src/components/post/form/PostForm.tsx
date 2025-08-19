"use client";

import {
  ClaudeContextProvider,
  useClaudeLoading,
} from "@/src/context/ClaudeContext";
import { useClaude } from "@/src/hooks/useClaude";
import { IPost } from "@/type";
import { usePostForm } from "../../../hooks/usePostForm";
import { Button } from "../../ui/button";
import { FormBasicFields } from "./FormBasicFields";
import { FormCommunicateWithAI } from "./FormCommunicateWithAI";
import { FormContentEditor } from "./FormContentEditor";
import { FormMetaFields } from "./FormMetaFields";
import { FormThumbnailSection } from "./FormThumbnailSection";

const PostFormContent = ({
  post,
  korPost,
  lang,
}: {
  post?: IPost;
  korPost: IPost;
  lang: string;
}) => {
  const { form, state, handlers } = usePostForm(lang, post);
  const { claudeLoading } = useClaudeLoading();
  console.log(post);

  const { handleSendMessageToClaude } = useClaude(
    handlers.setEnglishContent,
    korPost.content
  );

  return (
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
      <FormCommunicateWithAI
        isDisabled={claudeLoading}
        handleSendMessageToClaude={handleSendMessageToClaude}
      />
      <FormContentEditor control={form.control} getValues={form.getValues} />
      <FormMetaFields
        control={form.control}
        setValue={form.setValue}
        categories={state.categories}
      />

      <Button type="submit" disabled={state.isSubmitting || claudeLoading}>
        {lang} version
      </Button>
    </form>
  );
};

const PostForm = ({
  post,
  lang,
  korPost,
}: {
  post?: IPost;
  lang: string;
  korPost: IPost;
}) => {
  return (
    <div>
      <ClaudeContextProvider>
        <PostFormContent post={post} lang={lang} korPost={korPost} />
      </ClaudeContextProvider>
    </div>
  );
};

export default PostForm;
