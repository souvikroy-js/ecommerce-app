"use client";

import { Button } from "@/components/shadcnui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcnui/dropdown-menu";
import type { Column, Table } from "@tanstack/react-table";
import { CheckIcon, Settings2 } from "lucide-react";
import { useCallback } from "react";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

function getColumnLabel<TData>(column: Column<TData>): string {
  if (
    column.columnDef.meta &&
    typeof (column.columnDef.meta as Record<string, unknown>).label === "string"
  ) {
    return (column.columnDef.meta as Record<string, unknown>).label as string;
  }
  const header = column.columnDef.header;
  if (typeof header === "string") return header;
  return column.id
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const toggle = useCallback(
    (column: ReturnType<Table<TData>["getAllColumns"]>[number]) => {
      column.toggleVisibility();
    },
    [],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          />
        }>
        <Settings2 className="size-4" />
        View
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-37.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => (
              <DropdownMenuItem
                key={column.id}
                className="capitalize"
                closeOnClick={false}
                onClick={() => toggle(column)}>
                <span className="mr-2 flex size-4 items-center justify-center">
                  {column.getIsVisible() && <CheckIcon className="size-3.5" />}
                </span>
                {getColumnLabel(column)}
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
