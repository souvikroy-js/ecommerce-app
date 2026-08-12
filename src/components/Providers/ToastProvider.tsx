"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { ToastContainer } from "react-toastify";

const emptySubscribe = () => () => {};

const ToastProvider = () => {
  const { resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) return null;

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

export default ToastProvider;
