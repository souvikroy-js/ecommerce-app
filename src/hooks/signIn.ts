import { authClient } from "@/lib/auth-client";
import { LoginType } from "@/lib/types";

const signIn = async ({ email, password }: LoginType) => {
  try {
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      console.error(error);
      return {
        isSuccess: false,
        message: "Invalid email or password.",
      };
    }

    return {
      isSuccess: true,
      message: "User Login Successfully 👍",
    };
  } catch (error) {
    console.error(error);

    return {
      isSuccess: false,
      message: "User Login Failed 😢",
    };
  }
};

export default signIn;
