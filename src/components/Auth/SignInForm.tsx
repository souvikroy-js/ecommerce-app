"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zodSchema";
import { LoginType } from "@/lib/types";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { EyeIcon, EyeOffIcon, Loader2Icon, LockIcon } from "lucide-react";
import { Button } from "../shadcnui/button";
import { useRouter } from "next/navigation";
import signIn from "@/hooks/signIn";
import { toast } from "react-toastify";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const loginButtonHandeler = async (loginData: LoginType) => {
    console.log(loginData);

    const { isSuccess, message } = await signIn(loginData);
    if (!isSuccess) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      // replace("/dashboard");
      reset();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(loginButtonHandeler)}
        className="grid gap-6"
        noValidate>
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
                  autoComplete="current-password"
                />
                {/* Show / Hide Toggle */}

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
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
              <Loader2Icon className="animate-spin" /> Logging in...
            </>
          : <>
              <LockIcon /> Login
            </>
          }
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
