"use client";

import { EyeIcon, EyeOffIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcnui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import adminProductsControl from "@/hooks/adminProductsControl";
import { toast } from "react-toastify";
import adminProductsDelete from "@/hooks/adminProductsDelete";

type ProductItem = {
  id: string;
  name: string;
  isActive: boolean;
};

type AdminProductsActionsProps = {
  product: ProductItem;
};

const AdminProductsActions = ({ product }: AdminProductsActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleActive = async () => {
    setLoading("");
    const { success, error, isActive } = await adminProductsControl(product.id);

    if (!success) {
      toast.error(error);
    }

    if (success) {
      toast.success(isActive ? "Activated" : "Deactivated");
    }
    setLoading(null);
  };

  const deleteProduct = async () => {
    setLoading("");
    const { success, error } = await adminProductsDelete(product.id);

    if (!success) {
      toast.error(error);
    }
    if (success) {
      toast.success(error);
      router.refresh();
    }
    setLoading(null);
  };

  return (
    <div className="flex gap-1">
      <Button
        size="icon-sm"
        variant="ghost"
        onClick={toggleActive}
        disabled={loading !== null}
        title={product.isActive ? "Deactivate" : "Activate"}>
        {loading === "toggle" ?
          <Loader2Icon className="size-4 animate-spin" />
        : product.isActive ?
          <EyeOffIcon className="size-4" />
        : <EyeIcon className="size-4" />}
      </Button>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}>
        <DialogTrigger
          render={
            <Button
              size="icon-sm"
              variant="ghost"
              disabled={loading !== null}
              title="Delete"
              className="text-destructive hover:text-destructive"
            />
          }>
          <Trash2Icon className="size-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete &ldquo;{product.name}&rdquo;?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The product and its images will be
              permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              variant="destructive"
              onClick={deleteProduct}
              disabled={loading === "delete"}>
              {loading === "delete" ?
                <Loader2Icon className="size-4 animate-spin" />
              : <Trash2Icon className="size-4" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsActions;
