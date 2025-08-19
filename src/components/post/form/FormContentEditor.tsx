import { useClaudeLoading } from "@/src/context/ClaudeContext";
import { IPost } from "@/type";
import { Label } from "@radix-ui/react-label";
import dynamic from "next/dynamic";
import { Control, Controller, UseFormGetValues } from "react-hook-form";

const EditorWrapper = dynamic(() => import("../../shared/EditorWrapper"), {
  ssr: false,
  loading: () => <div>에디터 로딩 중...</div>,
});

interface FormContentEditorProps {
  control: Control<IPost>;
  getValues: UseFormGetValues<IPost>;
}

export const FormContentEditor = ({
  control,
  getValues,
}: FormContentEditorProps) => {
  const { claudeLoading } = useClaudeLoading();

  return (
    <section>
      <Label>Content</Label>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <EditorWrapper
            apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API!}
            onInit={(e, editor) => {}}
            onEditorChange={(newValue) => {
              field.onChange(newValue);
            }}
            value={getValues("content")}
            disabled={claudeLoading}
          />
        )}
      />
    </section>
  );
};
