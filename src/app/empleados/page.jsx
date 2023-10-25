/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-27 10:26:45
 * @modify date 2023-10-25 10:26:45
 * @desc Página que despliega una tabla para ver a todos los empleados registrados
 */

"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function GestionEmpleados() {
  const [errorMessage, setErrorMessage] = useState(null); // para mostrar errores
  const [empleados, setEmpleados] = useState(null); // para guardar empleados
  const [csv, setCsv] = useState({}); // para guardar la info para descargar
  const router = useRouter(); // para redirigir
  const { privilegios } = useAuth(); // obtenemos le nivel de acceso

  // función que obtiene todos los empleados de la base de dats
  async function getEmpleados() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      "operador/obtener-empleados?filtro=fecha&reverse=true";
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
        // Si todo bien, colocamos los datos en las varibles
        setEmpleados(json.DatosTabla);
        setCsv(json.DatosCsv);
      } else {
        // Si hay algun problema inicializamos vacío para no perder la tabla
        setEmpleados([]);
        setCsv([]);
        // Y colocamos mensaje de error para que se muestre en pantalla
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
      header: () => {
        privilegios == "gerente" ? "Ver/Editar" : "";
      },
      cell: ({ row }) => {
        if (privilegios == "gerente") {
          return (
            <div
              className="p-2 cursor-pointer hover:font-semibold hover:italic"
              onClick={() => {
                router.push(`/empleados/${row.getValue("id")}`);
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
    <div className="flex flex-col content-center gap-5 min-h-screen  pt-24">
      <div className="container mx-auto py-10">
        {errorMessage != null && (
          <div className="flex flex-col gap-4 items-center justify-start">
            {errorMessage}.{" "}
            {privilegios == "operador" && (
              <Link
                className="bg-black rounded p-2 text-white "
                href="/empleados/nuevo"
              >
                Registrar empleados
              </Link>
            )}
          </div>
        )}
        {empleados != null && (
          <DataTable
            columns={columns}
            data={empleados}
            datosDescarga={csv}
            headerTitle={"Empleados activos"}
            headerDesc="Estos son todos los empleados dados de alta."
            ctaVisible={true}
            ctaDesc="Nuevo empleado"
            ctaLink="/empleados/nuevo"
            ctaPriv={["operador"]}
            filter_placeholder={"Buscar por RFC"}
            filter_key={"rfc"}
          />
        )}
      </div>
    </div>
  );
}
