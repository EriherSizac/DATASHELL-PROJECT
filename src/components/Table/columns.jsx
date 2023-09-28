"use client";
///TO DELETE
import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  //we can set normal fields like this
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  //
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      //we can format the amount in any currency without any use of external package

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
