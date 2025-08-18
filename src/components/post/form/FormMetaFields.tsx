import { Category, IPost } from "@/type";
import { Label } from "@radix-ui/react-label";
import dynamic from "next/dynamic";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const HashContainer = dynamic(() => import("../../hash/HashContainer"), {
  ssr: false,
  loading: () => <div>태그 로딩 중...</div>,
});

interface FormMetaFieldsProps {
  control: Control<IPost>;
  setValue: UseFormSetValue<IPost>;
  categories: Category[];
}

export const FormMetaFields = ({
  control,
  setValue,
  categories,
}: FormMetaFieldsProps) => {
  return (
    <>
      <section>
        <Label>Category</Label>
        {categories && (
          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value ? field.value.toString() : ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  const selectedCategory = categories.find(
                    (category) => category.category_id.toString() === value
                  );
                  if (selectedCategory) {
                    setValue("category_name", selectedCategory.category_name);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Set Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {categories.map((e) => (
                      <SelectItem
                        value={e.category_id.toString()}
                        key={e.category_id}
                      >
                        {e.category_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        )}
      </section>

      <section>
        <Label>Status</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Set Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="PUBLIC">Public</SelectItem>
                  <SelectItem value="PRIVATE">Private</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </section>

      <section>
        <Label>Tags</Label>
        <HashContainer />
      </section>
    </>
  );
};
