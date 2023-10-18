"use client";
//we have to import a lot of things and here are they
import * as React from "react";
import { Input } from "@/components/ui/input";
import CsvDownloadButton from "react-json-to-csv";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
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
import { Button } from "@/components/ui/button";

import { useAuth } from "../AuthComponent";
import Link from "next/link";

export function DataTable({
  columns,
  data,
  headerTitle,
  headerDesc,
  ctaDesc,
  ctaLink,
  ctaPriv,
  ctaVisible,
  filter_placeholder,
  filter_key,
  datosDescarga
}) {
  // and now we will use this useReactTable hook
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const[headers, setHeaders] = React.useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    // and yes adding pagination can be done with just this above one line
  });
  const { privilegios } = useAuth();

  function getRows(){
    var len = Object.keys(columns) ;
    var newT = []
    for (let i = 0; i < len.length; i++) {
      newT.push(columns[i].accessorKey);
      
    }
    return newT;
  }
React.useEffect(() => {
  setHeaders(getRows());
}, [])


  return (
    <div className="">
      <div className="flex w-full items-center py-4">
        <Input
          placeholder={filter_placeholder}
          value={table.getColumn(filter_key)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(filter_key)?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded w-full border-slate-700 bg-white"
        />
      </div>
      <div className="rounded-xl border overflow-hidden">
        <div className="rounded-md border flex w-full items-center pr-3 bg-white">
          <div className=" flex flex-col p-3 w-full">
            <h1 className="text-xl bold w-max">{headerTitle}</h1>
            <div>{headerDesc}</div>
          </div>

          <div className="flex flex-row gap-4">
            <div>
              {ctaPriv.indexOf(privilegios) != -1 && ctaVisible && ctaLink != '' && (
                <Link
                  href={ctaLink}
                  className="block bg-black text-white rounded p-3 w-max cursor-pointer"
                >
                  {ctaDesc}
                </Link>
              )}
            </div>
            <div>
              {privilegios == 'gerente' && datosDescarga != null &&(
                <>
                <div
                  className="block bg-black text-white rounded p-3 w-max cursor-pointer"
                  onClick={()=>{document.getElementById('here').click()}}
                >
                  Descargar como CSV
                  
                </div>
                <CsvDownloadButton id="here" className="hidden" headers={datosDescarga.headers} data={datosDescarga.data} filename={headerTitle+'.csv'} delimiter=","/>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white">
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
        <Button
          className="bg-black p-2 text-white rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          className="bg-black p-2 text-white rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
