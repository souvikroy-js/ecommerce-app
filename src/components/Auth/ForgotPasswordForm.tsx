"use client";

import { ForgotPasswordType } from "@/lib/types";
import { forgotPasswordSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcnui/card";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Button } from "../shadcnui/button";
import { Loader2Icon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [sent, setSent] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "all",
  });

  const onSubmit = async ({ email }: ForgotPasswordType) => {
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Reset link sent! Check your email.");
    setSent(true);
  };

  if (sent) {
    return (
      <Card
        size="sm"
        className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            If an account exists with that email, you&apos;ll receive a password
            reset link shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center text-sm">
            <Link
              href="/sign-in"
              className="text-foreground underline-offset-4 hover:underline">
              Back to Sign In
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
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-6"
          noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="email"
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
                <Loader2Icon className="animate-spin" /> Sending
              </>
            : <>
                <MailIcon /> Send Reset Link
              </>
            }
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link
            href="/sign-in"
            className="text-foreground underline-offset-4 hover:underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
