"use client";

import { Button } from "@/components/shadcnui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Field, FieldError, FieldLabel } from "@/components/shadcnui/field";
import { Input } from "@/components/shadcnui/input";
import { authClient } from "@/lib/auth/auth-client";
import { ResetPasswordType } from "@/lib/types";
import { resetPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, LockIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "" },
    mode: "all",
  });

  const onSubmit = async (data: ResetPasswordType) => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password reset successful! Please sign in.");
    reset();
    replace("/sign-in");
  };

  if (!token) {
    return (
      <Card
        size="sm"
        className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Invalid Link</CardTitle>
          <CardDescription>
            This reset link is invalid or has expired.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-foreground underline-offset-4 hover:underline">
              Request a new reset link
            </Link>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      size="sm"
      className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
          noValidate>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full">
            {isSubmitting ?
              <>
                <Loader2Icon className="animate-spin" /> Resetting
              </>
            : <>
                <LockIcon /> Reset Password
              </>
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
