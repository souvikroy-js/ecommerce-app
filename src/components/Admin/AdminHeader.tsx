import { LayoutDashboardIcon, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import ThemeToggleButton from "../Layout/ThemeToggleButton";
import LogoutButton from "../LogoutButton";
import { Avatar, AvatarFallback } from "../shadcnui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcnui/dropdown-menu";
import { SidebarTrigger } from "../shadcnui/sidebar";

const AdminHeader = () => {
  return (
    <header className="bg-background sticky top-0 z-10 flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground ml-2 flex items-center gap-1.5 text-sm no-underline">
          <ShoppingBagIcon size={16} />
          <span className="hidden sm:inline">Shop</span>
        </Link>
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-1" />
            }>
            <Avatar size="sm">
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <span>Admin name</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="my-1 w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">Admin name</span>
                  <span className="text-muted-foreground text-xs font-normal">
                    Admin email
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LayoutDashboardIcon /> Dashboard
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default AdminHeader;
