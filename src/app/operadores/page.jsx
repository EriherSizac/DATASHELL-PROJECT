/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-27 10:26:45
 * @modify date 2023-10-25 10:26:45
 * @desc Página que muestra todos los operadores activos
 */


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function Operadores() {
  const [operadores, setOperadores] = useState(null); // para guardar la lista de operadores
  const [csv, setCsv] = useState({}) // para guardar la info del csv a descargar
  const [errorMessage, setErrorMessage] = useState(null); // para mostrar errores
  const { privilegios } = useAuth(); // para saber los privilegios del usuario
  const router = useRouter();

  // función para obtener todos los operadores de la BD
  const fetchData = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_backEnd + "gerente/obtener-operadores";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        setOperadores(data.DatosTabla);
        setCsv(data.DatosCsv);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData(); // obtenemos los datos al cargar la pag.
  }, []);

  // Definimos las columnas que estarán en la tabla
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "username",
      header: "Nombre de usuario",
    },
    {
      accessorKey: "creado_en",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Creado en
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => {"Ver/Editar"},
      cell: ({ row }) => {
        if (privilegios == "gerente") {
          return (
            <div
              className="p-2 cursor-pointer hover:font-semibold hover:italic"
              onClick={() => {
                router.push(`/operadores/${row.getValue("id")}`);
              }}
            >
              Ver/Editar
            </div>
          );
        } else {
          return <div></div>;
        }
      },
    },
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <div className="container mx-auto py-10">
        {errorMessage != null && <div>{errorMessage}</div>}
        {operadores != null && (
          <DataTable
            columns={columns}
            data={operadores}
            datosDescarga={csv}
            headerTitle={"Operadores activos"}
            headerDesc="Estos son todos los operadores dados de alta."
            ctaVisible={true}
            ctaDesc="Nuevo operador"
            ctaLink="/operadores/nuevo"
            ctaPriv={["gerente"]}
            filter_placeholder={"Buscar por nombre"}
            filter_key={"nombre"}
          />
        )}
      </div>
    </div>
  );
}
