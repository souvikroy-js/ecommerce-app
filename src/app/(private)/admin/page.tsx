import { OrderStatusBadge } from "@/components/Admin/OrderStatusBadge";
import { Badge } from "@/components/shadcnui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcnui/table";
import { auth } from "@/lib/auth/auth";
import prisma from "@/lib/dbClient/prisma";
import { formatPrice } from "@/lib/format";
import { FolderPlusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { Metadata } from "next";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Admin page | E-commerce App",
  description: "Admin page of E-commerce App",
};

const AdminPage = async () => {
  

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { user } = session!;

  const [
    totalOrders,
    totalUsers,
    totalProducts,
    totalCategories,
    inactiveCount,
    recentOrders,
    recentProducts,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.product.count(),
    prisma.category.count(),

    prisma.product.count({
      where: { isActive: false },
    }),

    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: true },
    }),

    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const statCards = [
    { label: "Total Orders", value: totalOrders, href: "/admin/orders" },
    {
      label: "Total Users",
      value: totalUsers,
      href: "/admin/users",
    },
    {
      label: "Products",
      value: totalProducts,
      href: "/admin/products",
    },
    { label: "Categories", value: totalCategories, href: "/admin/categories" },
    {
      label: "Inactive Products",
      value: inactiveCount,
      href: "/admin/products",
    },
  ];

  const quickActions = [
    { label: "New Product", href: "/admin/products/new", icon: PlusIcon },
    {
      label: "New Category",
      href: "/admin/categories/new",
      icon: FolderPlusIcon,
    },
    { label: "View Orders", href: "/admin/orders", icon: ShoppingCartIcon },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back,
            {user.name}
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.href}
                href={action.href}
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium">
                <Icon className="size-4" />
                {action.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <a
            key={card.label}
            href={card.href}>
            <Card className="hover:bg-accent transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {card.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ?
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => {
                    return (
                      <TableRow key={order.id}>
                        <TableCell>
                          <a
                            href={`/admin/orders/${order.id}`}
                            className="font-mono text-xs hover:underline">
                            {order.id.slice(0, 8).toUpperCase()}…
                          </a>
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.user.name}
                        </TableCell>
                        <TableCell>{formatPrice(order.total)}</TableCell>
                        <TableCell>
                          <OrderStatusBadge status={order.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            : <p className="text-muted-foreground text-sm">No orders yet.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProducts.length > 0 ?
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <a
                          href={`/admin/products/${product.id}`}
                          className="font-medium hover:underline">
                          {product.name}
                        </a>
                      </TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {product.name ?? "—"}
                      </TableCell>
                      <TableCell>
                        {product.isActive ?
                          <Badge variant="secondary">Active</Badge>
                        : <Badge variant="outline">Inactive</Badge>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            : <p className="text-muted-foreground text-sm">No products yet.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
