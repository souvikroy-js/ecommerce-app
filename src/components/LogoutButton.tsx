"use client";

import { Loader2Icon, LogOutIcon } from "lucide-react";
import { Button } from "./shadcnui/button";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import signout from "@/hooks/signout";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);

  const { replace } = useRouter();

  const logoutBtnFn = async () => {
    setLoading(true);

    const { isSuccess, message } = await signout();

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      replace("/sign-in");
      return;
    }

    setLoading(false);
  };

  return (
    <Button
      onClick={logoutBtnFn}
      disabled={loading}
      type="button"
      variant={"ghost"}
      className="cursor-pointer">
      {loading ?
        <>
          <Loader2Icon className="animate-spin" />
          <span>Logging out...</span>
        </>
      : <>
          <LogOutIcon />
          <span>Logout</span>
        </>
      }
    </Button>
  );
};

export default LogoutButton;
