import { Badge } from "@/components/shadcnui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Package, ShoppingBag, ShoppingBagIcon, User } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer page | E-commerce App",
  description: "Customer page of E-commerce App",
};

const CustomerPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back,
          {/* {user.name || user.email} */}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Role
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold capitalize">
              {/* {user.role ?? "customer"} */}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="truncate text-lg font-medium">{/* {user.email} */}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Verified
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* {user.emailVerified ? */}
            <Badge
              variant="secondary"
              className="text-base">
              Yes
            </Badge>
            :{" "}
            <Badge
              variant="outline"
              className="text-base">
              No
            </Badge>
            {/* } */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{/* {memberSince} */}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{/* {user.name || "—"} */}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{/* {user.email} */}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium capitalize">
                {/* {user.role ?? "customer"} */}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Verified</span>
              <span className="font-medium">
                {/* {user.emailVerified ? "Yes" : "No"} */}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Common actions and pages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/customer/profile"
              className="hover:bg-accent flex items-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors">
              <User className="size-4" />
              Profile Settings
            </Link>
            <Link
              href="/customer/orders"
              className="hover:bg-accent flex items-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors">
              <Package className="size-4" />
              My Orders
            </Link>
            <Link
              href="/"
              className="hover:bg-accent flex items-center gap-2 rounded-md border p-3 text-sm font-medium transition-colors">
              <ShoppingBagIcon className="size-4" />
              Browse Products
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerPage;
