import { useClaudeLoading } from "@/src/context/ClaudeContext";
import { IPost } from "@/type";
import { Label } from "@radix-ui/react-label";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../../ui/input";

interface FormBasicFieldsProps {
  register: UseFormRegister<IPost>;
  disabled?: boolean;
}

export const FormBasicFields = ({
  register,
  disabled,
}: FormBasicFieldsProps) => {
  const { claudeLoading } = useClaudeLoading();

  return (
    <>
      <section>
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Title"
          {...register("title")}
          disabled={claudeLoading}
          required
        />
      </section>

      <section>
        <Label>Subtitle</Label>
        <Input
          type="text"
          placeholder="Subtitle"
          {...register("subtitle")}
          disabled={claudeLoading}
          required
        />
      </section>

      <section>
        <Label>Storage Path</Label>
        <Input
          type="text"
          placeholder="Storage Path"
          {...register("storagePath")}
          disabled={disabled || claudeLoading}
          required
        />
      </section>
    </>
  );
};
