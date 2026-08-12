"use client";

import { RegisterType } from "@/lib/types";
import { registerSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { EyeIcon, EyeOffIcon, Loader2Icon, LockIcon } from "lucide-react";
import { Button } from "../shadcnui/button";
import signUp from "@/hooks/signUp";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const registerHandler = async (registerData: RegisterType) => {
    const { isSuccess, message } = await signUp(registerData);
    if (!isSuccess) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      reset();
      replace("/sign-in");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(registerHandler)}
      className="grid gap-6"
      noValidate>
      {/* Name field */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Name <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Enter your name"
              autoComplete="text"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email field */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Email <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Password field */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Password <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="new-password"
              />
              {/* Show / Hide Toggle */}

              <button
                type="button"
                // variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer">
                {showPassword ?
                  <EyeIcon className="h-5 w-5" />
                : <EyeOffIcon className="h-5 w-5" />}
              </button>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Confirm password field */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>
              Confirm password
              <span className="font-bold text-red-500">*</span>
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type={showPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                autoComplete="new-password"
              />

              {/* Show / Hide Toggle */}
              <button
                type="button"
                // variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 cursor-pointer">
                {showPassword ?
                  <EyeIcon className="h-5 w-5" />
                : <EyeOffIcon className="h-5 w-5" />}
              </button>
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isSubmitting}>
        {isSubmitting ?
          <>
            <Loader2Icon className="animate-spin" /> Creating account...
          </>
        : <>
            <LockIcon /> Register
          </>
        }
      </Button>
    </form>
  );
};

export default SignUpForm;
