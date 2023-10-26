/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-10-25 10:33:47
 * @modify date 2023-10-25 10:33:47
 * @desc Componente que renderiza una tabla de información utilizando tanstack-ui
 */

"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import CsvDownloadButton from "react-json-to-csv";
import Papa from "papaparse";
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
const allowedExtensions = ["csv"]; // extensiones permitidas
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
  datosDescarga, // los datos para descargar como csv
  showSubirCsv, // si muestra  o no el boton para cargar un csv
  csvAction, // qué hará despues de cargar el csv
  subirCsvText, // texto del boton
}) {
  // and now we will use this useReactTable hook
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [headers, setHeaders] = React.useState([]);
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
  });
  const { privilegios, loadingToast } = useAuth();

  // Se guardan los datos parseados
  const [parsedData, setparsedData] = React.useState([]);

  // Se guardan los errores
  const [error, setError] = React.useState("");

  // Para guardar el file usado por el usuario
  const [file, setFile] = React.useState("");

  function getRows() {
    var len = Object.keys(columns);
    var newT = [];
    for (let i = 0; i < len.length; i++) {
      newT.push(columns[i].accessorKey);
    }
    return newT;
  }
  React.useEffect(() => {
    setHeaders(getRows());
  }, []);

  // Función para cuando cambia el input file
  const handleFileChange = (e) => {
    loadingToast('Leyendo datos', 'subiendocsv', 'pending')
    setError("");
    // Verifica que haya un file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Verifica la extensión
      const fileExtension = inputFile?.type.split("/")[1];
      if (!allowedExtensions.includes(fileExtension)) {
        //setError("Por favor sube un archivo csv");
        loadingToast('Sube un archivo csv', 'subiendocsv', 'error')
        return;
      }
      // Si todo bien, coloca el archvo en el estado
      setFile(inputFile);
    }
  };

  //
  const handleParse = () => {
    // If user clicks the parse button without
    // a file we show a error
    if (!file) return loadingToast('Sube un archivo csv', 'subiendocsv', 'error')

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      console.log(parsedData);
     /*  const rows = Object.keys(parsedData[0]);

      const columns = Object.values(parsedData[0]);
      const res = rows.reduce((acc, e, i) => {
        return [...acc, [[e], columns[i]]];
      }, []); */
      console.log(parsedData);
      setparsedData(parsedData);
      loadingToast('Datos procesados con exito', 'subiendocsv', 'success');
      loadingToast('Subiendo datos al servidor', 'subiendocsv2', 'pending');
    };
    reader.readAsText(file);
  };

  React.useEffect(()=>{
    console.log('parsed', parsedData)
    if(parsedData.length > 0){
      csvAction(parsedData, setparsedData, setFile);
    }
  }, [parsedData])

  React.useEffect(()=>{
    if(file != ""){
      handleParse();
    }
  }, [file])

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
        <div className="rounded-md border flex flex-col sm:flex-row w-full items-left pb-4 sm:items-center pr-3 bg-white">
          <div className=" flex flex-col p-3 w-full">
            <h1 className="text-xl bold w-max">{headerTitle}</h1>
            <div>{headerDesc}</div>
          </div>

          <div className="flex flex-col sm:flex-row items-left pl-2 sm:pl-0 sm:items-center flex-row gap-4">
            <div>
              {ctaPriv.indexOf(privilegios) != -1 &&
                ctaVisible &&
                ctaLink != "" && (
                  <Link
                    href={ctaLink}
                    className="block bg-black text-white rounded p-3 w-max cursor-pointer"
                  >
                    {ctaDesc}
                  </Link>
                )}
            </div>
            <div>
              {privilegios == "gerente" && datosDescarga != null && (
                <>
                  <div
                    className="block bg-black text-white rounded p-3 w-max cursor-pointer"
                    onClick={() => {
                      document.getElementById("here").click();
                    }}
                  >
                    Descargar tabla como CSV
                  </div>
                  <CsvDownloadButton
                    id="here"
                    className="hidden"
                    headers={datosDescarga.headers}
                    data={datosDescarga.data}
                    filename={headerTitle + ".csv"}
                    delimiter=","
                  />
                </>
              )}
            </div>
            <div>
              {showSubirCsv && privilegios == 'operador' && (
                <>
                  <label
                    htmlFor="csvUp"
                    className="block bg-black text-white rounded p-3 w-max cursor-pointer "
                  >
                    {subirCsvText}{" "}
                  </label>
                  <input id="csvUp" type="file" className="hidden" onChange={handleFileChange}/>
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
