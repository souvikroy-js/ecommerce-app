"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";
import {
  Loader2Icon,
  MoreHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "../shadcnui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcnui/dialog";
import AdminUserForm from "./AdminUserForm";
import adminUserUpdate from "@/hooks/adminUserUpdate";
import adminUserDelete from "@/hooks/adminUserDelete";

type UserItem = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
};

type AdminUsersActionsProps = {
  user: UserItem;
};

const AdminUsersActions = ({ user }: AdminUsersActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const setRole = async (role: "admin" | "customer") => {
    setLoading("role");

    const { isSuccess, message } = await adminUserUpdate({
      id: user.id,
      role,
    });

    setLoading(null);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      router.refresh();
    }
  };

  const handleBan = async (banned: boolean) => {
    setLoading("ban");

    const { isSuccess, message } = await adminUserUpdate({
      id: user.id,
      banned,
      banReason: "",
    });

    setLoading(null);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    setLoading("delete");

    const { isSuccess, message } = await adminUserDelete(user.id);

    setLoading(null);

    if (!isSuccess) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success(message);
      setDeleteOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              size="icon-sm"
              variant="ghost"
            />
          }>
          {loading ?
            <Loader2Icon className="size-4 animate-spin" />
          : <MoreHorizontalIcon className="size-4" />}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            disabled={loading !== null}>
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm">
              <PencilIcon className="size-4" />
              Edit User
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.role !== "customer" && (
            <DropdownMenuItem
              onClick={() => setRole("customer")}
              disabled={loading !== null}>
              Make Customer
            </DropdownMenuItem>
          )}
          {user.role !== "admin" && (
            <DropdownMenuItem
              onClick={() => setRole("admin")}
              disabled={loading !== null}>
              Make Admin
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {user.banned ?
            <DropdownMenuItem
              onClick={() => handleBan(false)}
              disabled={loading !== null}>
              Unban User
            </DropdownMenuItem>
          : <DropdownMenuItem
              onClick={() => handleBan(true)}
              disabled={loading !== null}>
              Ban User
            </DropdownMenuItem>
          }
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            disabled={loading !== null}
            className="text-destructive focus:text-destructive">
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="flex w-full cursor-pointer items-center gap-2">
              <TrashIcon className="size-4" />
              Delete User
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AdminUserForm
        mode="edit"
        user={user}
        open={editOpen}
        onOpenChange={setEditOpen}
      />

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete <strong>{user.name}</strong> (
            {user.email})? This action cannot be undone.
          </p>
          <DialogFooter showCloseButton>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading === "delete"}>
              {loading === "delete" ?
                <Loader2Icon className="size-4 animate-spin" />
              : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminUsersActions;
