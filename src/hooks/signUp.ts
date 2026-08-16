import { authClient } from "@/lib/auth/auth-client";
import { RegisterType } from "@/lib/types";

const signUp = async ({ name, email, password }: RegisterType) => {
  try {
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }

    return {
      isSuccess: true,
      message: "User Registration Successfully 👍",
    };
  } catch (error) {
    console.error("Sign up failed:", error);

    return {
      isSuccess: false,
      message: "User Registration Failed 😢",
    };
  }
};

export default signUp;
