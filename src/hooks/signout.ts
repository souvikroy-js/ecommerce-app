import { authClient } from "@/lib/auth-client";

const signout = async () => {
  try {
    const { error } = await authClient.signOut();

    if (error) {
      return {
        isSuccess: false,
        message: error.message,
      };
    }

    return {
      isSuccess: true,
      message: "User Logout Successfully 👍",
    };
  } catch (error) {
    console.log(error);

    return {
      isSuccess: false,
      message: "User Logout Failed 😢",
    };
  }
};

export default signout;
