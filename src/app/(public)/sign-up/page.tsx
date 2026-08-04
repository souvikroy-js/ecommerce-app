import SignUpForm from "@/components/Auth/SignUpForm";
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
  title: "Signup page | E-commerce App",
  description: "Signup page of E-commerce App",
};

const SignUpPage = () => {
  return (
    <section className="grid h-[90dvh] place-items-center">
      <Card
        size="sm"
        className="w-full max-w-sm drop-shadow-lg dark:drop-shadow-lg dark:drop-shadow-gray-700">
        <CardHeader className="gap-3">
          <CardTitle className="text-center font-semibold">
            Create Account
          </CardTitle>

          <CardDescription className="text-center leading-5">
            Fill in the details to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className="grid place-items-center">
          You already have an account?
          <div>
            Please
            <Link
              href={"/sign-in"}
              className="mx-2 text-blue-600 underline hover:font-normal">
              Sign In
            </Link>
            Now.
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SignUpPage;
