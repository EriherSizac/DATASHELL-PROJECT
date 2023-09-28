"use client";
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function QuejasYSugerencias() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [tickets, setTickets] = useState(null);
  const router = useRouter();
  const { privilegios } = useAuth();
  const [tipoTickets, setTipoTickets] = useState("todos");
  const [tipoUsuarios, setTipoUsuarios] = useState("todos");

  async function getQuejas() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      `gerente/obtener-tickets?tipo_ticket=${tipoTickets}&tipo_usuario=${tipoUsuarios}`;
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
        setTickets(json);
      } else {
        console.log(json);
        setErrorMessage(json.error);
      }
    }
  }

  useEffect(() => {
    getQuejas();
  }, []);

  const columns = [
    //we can set normal fields like this
    {
      accessorKey: "tipo_ticket",
      header: "Asunto",
      cell: (row) => {
        return (
          row.getValue("tipo_ticket").charAt(0).toUpperCase() +
          row.getValue("tipo_ticket").slice(1)
        );
      },
    },
    {
      accessorKey: "asunto",
      header: "Titulo",
    },
    {
      accessorKey: "tipo_usuario",
      header: "Rol",
    },
    {
      accessorKey: "tipo_contacto",
      header: "Contacto",
      cell: (row) => {
        return (
          row.getValue("tipo_contacto").charAt(0).toUpperCase() +
          row.getValue("tipo_contacto").slice(1)
        );
      },
    },
    {
      accessorKey: "contacto",
      header: "Medio",
      cell: ({ row }) => {
        if (row.getValue("tipo_contacto") == "No quiero que me contacten") {
          return "Sin contacto";
        } else {
          if (row.getValue("tipo_contacto") == "telefono") {
            return (
              <Link
                href={`https://api.whatsapp.com/send?phone=${row.getValue(
                  "contacto"
                )}`}
                target="_blank"
                className="cursor-pointer hover:font-semibold hover:italic"
              >
                {row.getValue("contacto")}
              </Link>
            );
          } else {
            return (
              <Link
                href={`mailto:${row.getValue("contacto")}`}
                target="_blank"
                className="cursor-pointer hover:font-semibold hover:italic"
              >
                {row.getValue("contacto")}
              </Link>
            );
          }
        }
      },
    },
    {
      accessorKey: "fecha",
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
        <div
          className="p-2 cursor-pointer hover:font-semibold hover:italic"
          onClick={() => {}}
        >
          Ver/Editar
        </div>;
      },
    },
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <div className="container mx-auto py-10">
        <div>
          <div>Filtros adicionales</div>
          <div>
            <div className="p-2 cursor-pointer">Rol</div>
          </div>
        </div>
        {errorMessage != null && <div>{errorMessage}</div>}
        {tickets != null && (
          <DataTable
            columns={columns}
            data={tickets}
            headerTitle={"Lista de quejas y sugerencias"}
            headerDesc="Estas son las quejas y sugerencias que se han recibido"
            ctaDesc="Dejar queja o sugerencia"
            ctaVisible={true}
            ctaLink="/quejas-y-sugerencias/nueva"
            ctaPriv={["operador", "gerente", "empleado"]}
            filter_placeholder={"Buscar por asunto"}
            filter_key={"asunto"}
          />
        )}
      </div>
    </div>
  );
}
