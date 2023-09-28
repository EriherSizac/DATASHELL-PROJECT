"use client";
//we have to import a lot of things and here are they
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useAuth } from "../AuthComponent";
import Link from "next/link";

export function DataTable({ columns, data }) {
  // and now we will use this useReactTable hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // and yes adding pagination can be done with just this above one line
  });

  const { privilegios } = useAuth();

  return (
    <div>
      <div className="rounded-md border">
        <div className="rounded-md border flex w-full items-center pr-3">
          <div className=" flex flex-col p-3 w-full">
            <h1 className="text-xl bold w-max">Empleados activos</h1>
            <div>Estos son todos los empleados dados de alta.</div>
          </div>
          <div>
            {privilegios == "operador" && (
              <Link href={`/empleados/nuevo`} className="block bg-black text-white rounded p-3 w-max cursor-pointer">
                Nuevo empleado
              </Link>
            )}
          </div>
        </div>

        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="pt-5 flex gap-4">
        <button
          className="bg-black p-2 text-white rounded"
          onClick={() => table.previouspage()}
        >
          Anterior
        </button>
        <button
          className="bg-black p-2 text-white rounded"
          onClick={() => table.nextpage()}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
