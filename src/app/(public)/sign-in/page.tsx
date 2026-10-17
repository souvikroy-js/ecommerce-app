import SignInForm from "@/components/Auth/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signin page | E-commerce App",
  description: "Signin page of E-commerce App",
};

const SignInPage = () => {
  return (
    <section className="grid h-[90dvh] place-items-center">
      <Card
        size="sm"
        className="w-full max-w-sm drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
        <CardHeader className="gap-2 text-center">
          <CardTitle>Welcome back !</CardTitle>
          <CardDescription>Enter your credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
        </CardContent>

        <CardFooter className="grid place-items-center">
          You don&apos;t have an account?
          <div>
            Please
            <Link
              href={"/sign-up"}
              className="mx-2 text-blue-600 underline hover:font-normal">
              Sign Up
            </Link>
            Now.
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignInPage;
