"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";
import { Button } from "../shadcnui/button";
import { Loader2Icon, PencilIcon, PlusIcon } from "lucide-react";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcnui/select";
import adminUserUpload from "@/hooks/adminUserUpload";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  email: string;
  password?: string;
  role: string;
};

type Props = {
  mode: "create" | "edit";
  user?: {
    id: string;
    name: string;
    email: string;
    role: string | null;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const AdminUserForm = ({
  mode,
  user,
  open: controlledOpen,
  onOpenChange,
}: Props) => {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      password: "",
      role: user?.role ?? "customer",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const { isSuccess, message } = await adminUserUpload(
        mode,
        data,
        user?.id,
      );

      if (!isSuccess) {
        toast.error(message);
      }
      if (isSuccess) {
        toast.success(message);
      }
    } catch (error) {
      console.error(error);

      toast.error("Network error");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      {controlledOpen === undefined && (
        <DialogTrigger
          render={
            mode === "create" ?
              <Button>
                <PlusIcon className="size-4" />
                Add User
              </Button>
            : <button
                type="button"
                className="hover:bg-accent flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
                <PencilIcon className="size-4" />
                Edit User
              </button>
          }
        />
      )}
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "create" ? "Add User" : "Edit User"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="John Doe"
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                placeholder="john@example.com"
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>

            {mode === "create" && (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                  type="password"
                  placeholder="********"
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>
            )}

            <Field>
              <FieldLabel>Role</FieldLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
          </div>
          <DialogFooter showCloseButton>
            <Button
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ?
                <Loader2Icon className="size-4 animate-spin" />
              : mode === "create" ?
                "Create User"
              : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUserForm;
