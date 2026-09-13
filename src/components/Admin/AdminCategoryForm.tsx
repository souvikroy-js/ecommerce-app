"use client";

import { CreateCategory } from "@/lib/types";
import { categoryFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Button } from "../shadcnui/button";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import categoryUpload from "@/hooks/categoryUpload";
import { toast } from "react-toastify";

type Props = {
  mode: "create" | "edit";
  categoryId?: string;
  initialValues?: { name: string; slug: string };
};

const AdminCategoryForm = ({ mode, categoryId, initialValues }: Props) => {
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreateCategory>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      slug: initialValues?.slug ?? "",
    },
    mode: "all",
  });

  const nameValue = watch("name");
  // const slugValue = watch("slug");

  useEffect(() => {
    if (!slugManuallyEdited && mode === "create" && nameValue) {
      const autoSlug = nameValue
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setValue("slug", autoSlug);
    }
  }, [nameValue, slugManuallyEdited, mode, setValue]);

  const onSubmit = async (cData: CreateCategory) => {
    const { isSuccess, message } = await categoryUpload(cData);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid max-w-lg gap-6"
      noValidate>
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Category name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="slug"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="category-slug"
              onFocus={() => setSlugManuallyEdited(true)}
              autoComplete="off"
            />
            <p className="text-muted-foreground mt-1 text-xs">
              Auto-generated from name. Click to edit manually.
            </p>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" /> Saving
          </>
        : mode === "create" ?
          "Create Category"
        : "Create Category"}
      </Button>
    </form>
  );
};

export default AdminCategoryForm;
