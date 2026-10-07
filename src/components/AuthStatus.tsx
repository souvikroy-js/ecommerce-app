"use client";

import { Avatar, AvatarFallback } from "@/components/shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnui/dropdown-menu";
import { Button } from "@/components/shadcnui/button";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon, LogOutIcon, UserIcon } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

const AuthStatus = () => {
  const { data: session, isPending } = authClient.useSession();
  //   const setCart = useSetAtom(setCartAtom);
  const router = useRouter();

  if (isPending) return null;

  if (session) {
    const user = session.user;
    const initials =
      user.name ?
        user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : user.email[0].toUpperCase();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-1" />
          }>
          <Avatar size="sm">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm md:inline">
            {user.name || user.email}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-muted-foreground text-xs font-normal">
                  {user.email}
                </span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {user.role === "admin" && (
            <DropdownMenuItem onClick={() => router.push("/admin")}>
              <LayoutDashboardIcon />
              Admin Dashboard
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => router.push("/customer")}>
            <UserIcon />
            My Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={async () => {
              await authClient.signOut();
              //   setCart(null);
              router.push("/sign-in");
              router.refresh();
            }}>
            <LogOutIcon />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="xs"
        onClick={() => router.push("/sign-in")}>
        Sign In
      </Button>
      <Button
        size="xs"
        onClick={() => router.push("/sign-up")}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthStatus;
