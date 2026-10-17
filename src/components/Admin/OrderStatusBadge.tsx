import { cn } from "@/lib/utils";

const statusConfig: Record<
  string,
  { label: string; dot: string; bg: string; text: string; border: string }
> = {
  pending: {
    label: "Pending",
    dot: "bg-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  processing: {
    label: "Processing",
    dot: "bg-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-500/20",
  },
  shipped: {
    label: "Shipped",
    dot: "bg-purple-500",
    bg: "bg-purple-50 dark:bg-purple-500/10",
    text: "text-purple-700 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-500/20",
  },
  delivered: {
    label: "Delivered",
    dot: "bg-green-500",
    bg: "bg-green-50 dark:bg-green-500/10",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-200 dark:border-green-500/20",
  },
  cancelled: {
    label: "Cancelled",
    dot: "bg-red-500",
    bg: "bg-red-50 dark:bg-red-500/10",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-500/20",
  },
};

type OrderStatusBadgeProps = {
  status: string;
  className?: string;
};

export const OrderStatusBadge = ({
  status,
  className,
}: OrderStatusBadgeProps) => {
  const config = statusConfig[status] ?? {
    label: status,
    dot: "bg-gray-500",
    bg: "bg-gray-50 dark:bg-gray-500/10",
    text: "text-gray-700 dark:text-gray-400",
    border: "border-gray-200 dark:border-gray-500/20",
  };

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold whitespace-nowrap",
        config.bg,
        config.text,
        config.border,
        className,
      )}>
      <span className={cn("size-2 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
};
