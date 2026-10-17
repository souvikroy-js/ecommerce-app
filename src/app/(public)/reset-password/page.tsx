import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter your new password below",
};

const ResetPasswordPage = () => {
  return (
    <section className="grid min-h-[80dvh] place-items-center">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </section>
  );
};

export default ResetPasswordPage;
