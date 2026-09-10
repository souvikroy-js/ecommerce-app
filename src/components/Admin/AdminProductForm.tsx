"use client";

import { Controller, useForm } from "react-hook-form";
import { Input } from "../shadcnui/input";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";
import { Button } from "../shadcnui/button";
import { Loader2Icon } from "lucide-react";
import { CreateProduct } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "@/lib/zodSchema";
import ImageUpload from "./ImageUpload";
import uploadImage from "@/hooks/uploadImage";
import { useRef } from "react";
import adminProductUpload from "@/hooks/adminProductUpload";
import { toast } from "react-toastify";

type CategoryOption = {
  id: string;
  name: string;
};

type Props = {
  mode: "create" | "edit";
  productId?: string;
  initialValues?: Partial<CreateProduct>;
  categories: CategoryOption[];
};

const AdminProductForm = ({
  mode,
  productId,
  initialValues,
  categories,
}: Props) => {
  const fileRef = useRef<File | null>(null);
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      price: initialValues?.price ?? 0,
      stock: initialValues?.stock ?? 0,
      images: initialValues?.images ?? "",
      categoryId: initialValues?.categoryId ?? "",
    },
    mode: "all",
  });

  const onSubmit = async (data: CreateProduct) => {
    const file = fileRef.current;

    if (!file) {
      return <>File not found</>;
    }

    const { isSuccess, message } = await adminProductUpload(data, file);

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
              placeholder="Product name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Description</FieldLabel>
            <textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Product description"
              rows={4}
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Price</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                step="0.01"
                min="0"
                aria-invalid={fieldState.invalid}
                placeholder="0.00"
                onChange={(e) =>
                  field.onChange(
                    Number.isNaN(e.target.valueAsNumber) ? 0 : (
                      e.target.valueAsNumber
                    ),
                  )
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="stock"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                min="0"
                aria-invalid={fieldState.invalid}
                placeholder="0"
                onChange={(e) =>
                  field.onChange(
                    Number.isNaN(e.target.valueAsNumber) ? 0 : (
                      e.target.valueAsNumber
                    ),
                  )
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Image</FieldLabel>
            <ImageUpload
              value={field.value ?? ""}
              onChange={field.onChange}
              onFileChange={(f) => {
                fileRef.current = f;
              }}
            />
          </Field>
        )}
      />
      <Controller
        name="categoryId"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Category</FieldLabel>
            <Select
              value={field.value ?? ""}
              onValueChange={field.onChange}>
              <SelectTrigger
                id={field.name}
                className="w-full">
                <SelectValue placeholder="Select a category">
                  {categories.find((c) => c.id === field.value)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          "Create Product"
        : "Save Changes"}
      </Button>
    </form>
  );
};

export default AdminProductForm;
