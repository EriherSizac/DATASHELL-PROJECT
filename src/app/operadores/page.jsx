"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function Operadores() {
  const [operadores, setOperadores] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { privilegios } = useAuth();
  const router = useRouter();

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
        setOperadores(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    //we can set normal fields like this
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
