import { useClaudeLoading } from "@/src/context/ClaudeContext";
import { IPost } from "@/type";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { UseFormRegister } from "react-hook-form";
import { Input } from "../../ui/input";

interface FormThumbnailSectionProps {
  register: UseFormRegister<IPost>;
  image?: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormThumbnailSection = ({
  register,
  image,
  onImageChange,
}: FormThumbnailSectionProps) => {
  const { claudeLoading } = useClaudeLoading();

  return (
    <>
      <section>
        <Label>Thumbnail</Label>
        <Input
          className="mb-2"
          type="file"
          {...register("thumbnail")}
          accept="image/*"
          onChange={onImageChange}
          disabled={claudeLoading}
        />
        <Input
          type="text"
          placeholder="Thumbnail alt"
          {...register("thumbnail_alt")}
          required
          disabled={claudeLoading}
        />
      </section>

      {image && (
        <section className="flex justify-center">
          <Image alt="thumbnail preview" width={500} height={500} src={image} />
        </section>
      )}
    </>
  );
};
