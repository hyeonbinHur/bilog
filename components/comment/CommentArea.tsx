"use client";

import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { createCommentAction } from "@/action/commentAction";

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
    { onPendingChange }: { onPendingChange: (a: boolean) => void },
    ref: React.Ref<{ submit: () => void; pending: boolean; state: any }>
  ) => {
    const { id }: { id: string } = useParams();
    const { data: session } = useSession();

    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm<ICommentFormData>();

    const formRef = useRef<HTMLFormElement>(null);

    const [currentUser, setCurrentUser] = React.useState<ICurrentUser>({
      user_id: "",
      user_name: "",
      user_avatar: "",
    });

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

    const onSubmit = async (data: ICommentFormData) => {
      // Create FormData object
      const formData = new FormData();
      formData.append("user_id", currentUser.user_id);
      formData.append("user_name", currentUser.user_name);
      formData.append("user_avatar", currentUser.user_avatar);
      formData.append("post_id", data.post_id);
      formData.append("content", data.content);
      // Trigger the action to create the comment here, passing the formData
      await createCommentAction(data, formData);
      onPendingChange(true);
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
              placeholder="What are your thoughts?"
            />
          )}
        />
      </form>
    );
  }
);

export default CommentArea;
