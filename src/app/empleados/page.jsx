"use client";

import { Payment } from "@/components/Table/columns";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";

export default function GestionEmpleados() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [empleados, setEmpleados] = useState(null);
  const router = useRouter();
  const { privilegios } = useAuth();

  async function getEmpleados() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      "operador/obtener-empleados?filtro=alfabetico&reverse=true";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        console.log(json);
        setEmpleados(json);
      } else {
        console.log(json);
        setErrorMessage(json.error);
      }
    }
  }

  useEffect(() => {
    getEmpleados();
  }, []);

  const columns = [
    //we can set normal fields like this
    {
      accessorKey: "nombre",
      header: "Nombre",
    },
    {
      accessorKey: "rfc",
      header: "RFC",
    },
    {
      accessorKey: "correo",
      header: "Correo",
      cell: ({ row }) => {
        return (
          <Link
            href={`mailto:${row.getValue("correo")}`}
            target="_blank"
            className="cursor-pointer hover:font-semibold hover:italic"
          >
            {row.getValue("correo")}
          </Link>
        );
      },
    },
    {
      accessorKey: "celular",
      header: "Celular",
      cell: ({ row }) => {
        return (
          <Link
            href={`https://api.whatsapp.com/send?phone=${row
              .getValue("celular")
              .slice(1)}`}
            target="_blank"
            className="cursor-pointer hover:font-semibold hover:italic"
          >
            {row.getValue("celular")}
          </Link>
        );
      },
    },
    {
      accessorKey: "banco",
      header: "Banco",
    },
    {
      accessorKey: "creado_en",
      header: "Creado en",
    },
    {
      accessorKey: "id",
      header: ()=>{privilegios == 'gerente' ? 'Ver/Editar' : ''},
      cell: ({ row }) => {
        if (privilegios == "gerente") {
          return (
            <div
              className="p-2 cursor-pointer hover:font-semibold hover:italic"
              onClick={() => {
                router.push(`/empleado/${row.getValue("id")}`);
              }}
            >
              Ver/Editar
            </div>
          );
        }else{
            return <div></div>
        }
      },
    },
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <div className="container mx-auto py-10">
        {errorMessage != null && <div>{errorMessage}</div>}
        {empleados != null && <DataTable columns={columns} data={empleados} />}
      </div>
    </div>
  );
}
