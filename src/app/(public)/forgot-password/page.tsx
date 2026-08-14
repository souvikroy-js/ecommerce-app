import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Enter your email and we'll send you a reset link",
};

const ForgotPasswordPage = () => {
  return (
    <section className="grid min-h-[80dvh] place-items-center">
      <ForgotPasswordForm />
    </section>
  );
};

export default ForgotPasswordPage;
