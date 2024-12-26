"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/src/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  createCommentAction,
  updateCommentAction,
} from "@/src/app/action/commentAction";
import { Comment, ServerActionResponse } from "@/type";
import { useTranslations } from "next-intl";
import { useError } from "@/src/context/ErrorContext";

interface ICommentFormData {
  user_id: string;
  user_name: string;
  user_avatar: string;
  post_id: string;
  content: string;
}

interface ICurrentUser {
  user_id: string;
  user_name: string;
  user_avatar: string;
}

const CommentArea = forwardRef(
  (
    {
      onPendingChange,
      comments,
      comment,
      onChangeEditState,
    }: {
      onPendingChange?: (a: boolean) => void;
      comments?: number;
      comment?: Comment;
      onChangeEditState?: (a: boolean) => void;
    },
    ref: React.Ref<{ submit: () => void; pending: boolean; state: any }>
  ) => {
    // Variable declaration
    const { id }: { id: string } = useParams();
    const { data: session } = useSession();
    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<ICommentFormData>({
      mode: "onSubmit",
      defaultValues: {
        ...(comment && { ...comment }),
      },
    });
    const formRef = useRef<HTMLFormElement>(null);
    const [currentUser, setCurrentUser] = React.useState<ICurrentUser | null>(
      null
    );
    const t = useTranslations("Comment");
    const { setError } = useError();

    useEffect(() => {
      if (session) {
        const newUser: ICurrentUser = {
          user_name: session.user.name as string,
          user_avatar: session.user.image as string,
          user_id: session.user.id as string,
        };
        setCurrentUser(newUser);
      }
    }, [session]);

    //Client Component EventHanlder && Trigger Server action
    const onSubmit = async (data: ICommentFormData) => {
      if (comment) {
        const newComment: Comment = comment;
        newComment.content = data.content;
        if (!currentUser || currentUser.user_id !== comment.user_id) {
          setError(new Error("test error"));
          return;
        }
        const serverResponse: ServerActionResponse = await updateCommentAction(
          newComment
        );

        if (serverResponse.state.status === false) {
          setError(new Error(serverResponse.state.error));
        }

        if (onChangeEditState) {
          onChangeEditState(false);
        }
        //
      } else {
        const formData = new FormData();
        if (currentUser === null) {
          setError(new Error("Error test"));
          return;
        }
        formData.append("user_id", currentUser.user_id);
        formData.append("user_name", currentUser.user_name);
        formData.append("user_avatar", currentUser.user_avatar);
        formData.append("post_id", data.post_id);
        formData.append("content", data.content);
        formData.append("comments", comments!.toString());

        const serverResponse: ServerActionResponse = await createCommentAction(
          formData
        );

        if (serverResponse.state.status === false) {
          setError(new Error(serverResponse.state.error));
        }

        if (onPendingChange) {
          onPendingChange(true);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        handleSubmit(onSubmit)();
      },
      pending: isSubmitting,
      state: formRef.current,
    }));

    return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="post_id"
          control={control}
          defaultValue={id || ""}
          render={({ field }) => <input {...field} hidden readOnly />}
        />

        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              className="focus:border-2 focus:border-slate-500 border-2 focus-visible:ring-0"
              placeholder={t("YourOpinion")}
            />
          )}
        />
      </form>
    );
  }
);
CommentArea.displayName = "CommentArea";
export default CommentArea;
