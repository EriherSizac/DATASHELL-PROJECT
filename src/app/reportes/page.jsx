"use client";
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import { data } from "autoprefixer";

export default function Reportes() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [datos, setDatos] = useState(null);
  const router = useRouter();
  const { privilegios } = useAuth();
  const [tipoTickets, setTipoTickets] = useState("todos");
  const [tipoUsuarios, setTipoUsuarios] = useState("todos");
  const tipos_usuario = ["empleado", "operador", "gerente"];
  const [isOpenModal, setIsOpenMOdal] = useState(false);
  const tipos_ticket = ["queja", "sugerencia", "otro"];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [modalHeader, setModalHeader] = useState("");
  const refRoles = useRef();
  const refAsuntos = useRef();

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
        //setDatos(json);
        setDatos([{
            nombre_empleado:'Roberto Ozuna',
            rfc:"CTG211099RT6",
            empresa: "Auto Zone de Mexico",
            contrato: "Mxl1/07",
            fecha_solicitud:"15/09/2023",
            fecha_deposito:"16/09/2023",
            num_cuenta:"175779702",
            banco:"Bancomer",
            solicitado:"1000.00",
            gastos_adm:"60.00",
            com_banc:"5.80",
            sub_total:"65.80",
            iva:"10.53",
            transferencia:"923.67"

        }])
      } else {
        if (response.status == 401) {
          setIsOpenMOdal(true);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setDatos([]);
      }
      
    }
  }

  function limpiarFiltros(e) {
    e.preventDefault();
    setTipoTickets("todos");
    setTipoUsuarios("todos");
    refRoles.current.selectedIndex = 0;
    refAsuntos.current.selectedIndex = 0;
  }

  function verDetalle(index) {
    if (index == -1) {
      return <div></div>;
    }
    var ticket = tickets[index];

    return (
      <div className="pl-5 pr-5 rounded flex flex-col gap-4 w-full">
        <h4>
          {ticket.asunto} -{" "}
          {ticket.tipo_usuario.charAt(0).toUpperCase() +
            ticket.tipo_usuario.slice(1)}
        </h4>
        <div>Fecha: {ticket.fecha}</div>
        <div className="flex flex-col gap-1">
          Mensaje
          <div className="p-4 border-black border rounded w-full break-words ">
            {ticket.descripcion}
          </div>
        </div>
        <div>
          {ticket.contacto != "" && ticket.tipo_contacto == "telefono" ? (
            <Link
              href={`https://api.whatsapp.com/send?phone=${ticket.contacto}`}
              target="_blank"
              className={` flex justify-left items-left text-center transition duration-100 hover:italic hover:font-bold hover:text-yellow-400`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-9 h-7"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28z"
                ></path>
              </svg>
              {ticket.contacto}
            </Link>
          ) : (
            ticket.tipo_contacto == "correo" && (
              <Link
                href={`mailto:${ticket.contacto}`}
                className={` flex justify-left items-left text-center transition duration-100 hover:italic hover:font-bold hover:text-yellow-400`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="w-9 h-7"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"
                  ></path>
                </svg>
                {ticket.contacto}
              </Link>
            )
          )}
          {ticket.contacto == "" && <div>No solicitó datos de contacto</div>}
        </div>
      </div>
    );
  }

  function handleAsuntos(e) {
    setTipoTickets(e.target.value);
  }
  function handleRoles(e) {
    setTipoUsuarios(e.target.value);
  }

  useEffect(() => {
    //getQuejas();
    setDatos([{
        nombre_empleado:'Roberto Ozuna',
        rfc:"CTG211099RT6",
        empresa: "Auto Zone de Mexico",
        contrato: "Mxl1/07",
        fecha_solicitud:"15/09/2023",
        fecha_deposito:"16/09/2023",
        num_cuenta:"175779702",
        banco:"Bancomer",
        solicitado:"1000.00",
        gastos_adm:"60.00",
        com_banc:"5.80",
        sub_total:"65.80",
        iva:"10.53",
        transferencia:"923.67"

    }])
  }, []);

  useEffect(() => {
    //getQuejas();
  }, [tipoTickets, tipoUsuarios]);

  const columns = [
    //we can set normal fields like this
    {
      accessorKey: "nombre_empleado",
      header: "Nombre Empleado",
    },
    {
      accessorKey: "rfc",
      header: "RFC",
    },
    {
      accessorKey: "empresa",
      header: "Empresa",
    },
    {
      accessorKey: "contrato",
      header: "# Contrato",
    },
    {
      accessorKey: "fecha_solicitud",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha solicitud
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "fecha_deposito",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha depósito
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "num_cuenta",
      header: "Numero Cuenta",
    },
    {
      accessorKey: "banco",
      header: "Banco",
    },
    {
      accessorKey: "solicitado",
      header: "Solicitado",
      cell: (row) => {
        return (
          `$${row.getValue('solicitado')}`
        );
      },
    },
    {
      accessorKey: "gastos_adm",
      header: "Gastos Adm. Interés",
      cell: (row) => {
        return (
          `$${row.getValue('gastos_adm')}`
        );
      },
    },
    {
      accessorKey: "com_banc",
      header: "Comisión Bancaria",
      cell: (row) => {
        return (
          `$${row.getValue('com_banc')}`
        );
      },
    },
    {
      accessorKey: "sub_total",
      header: "Sub. Total",
      cell: (row) => {
        return (
          `$${row.getValue('sub_total')}`
        );
      },
    },
    {
      accessorKey: "iva",
      header: "IVA",
      cell: (row) => {
        return (
          `$${row.getValue('iva')}`
        );
      },
    },
    {
      accessorKey: "transferencia",
      header: "Transferencia",
      cell: (row) => {
        return (
          `$${row.getValue('transferencia')}`
        );
      },
    }
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <Modal></Modal>
      <div className="container mx-auto py-10">
        <Modal
          isOpen={selectedIndex != -1}
          onClose={() => setSelectedIndex(-1)}
          buttonCloseText="Cerrar"
          modalHeader={modalHeader}
          sizeW="max-w-2xl"
        >
          {verDetalle(selectedIndex)}
        </Modal>
        <div className="hidden">
          <div className="pb-1">Filtros adicionales</div>
          <form className="flex flex-row sm:flex-row sm:items-center flex-wrap sm:flex-nowrap sm:justify-start gap-4">
            <div className="flex flex-row gap-4 w-full sm:w-1/2">
              <select
                ref={refAsuntos}
                className="p-2 cursor-pointer border border-slate-700 shrink-0 sm:shrink rounded w-[48%] sm:w-full"
                onChange={(e) => {
                  handleAsuntos(e);
                }}
              >
                <option value="todos">Todos los asuntos</option>
                {tipos_ticket.map((usuario, key) => {
                  return (
                    <option value={usuario} key={key}>
                      {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                    </option>
                  );
                })}
              </select>
              <select
                ref={refRoles}
                className="p-2 cursor-pointer border border-slate-700 rounded w-[48%] shrink-0 sm:shrink sm:w-full"
                onChange={(e) => {
                  handleRoles(e);
                }}
              >
                <option value="todos">Todos los roles</option>
                {tipos_usuario.map((usuario, key) => {
                  return (
                    <option value={usuario} key={key}>
                      {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              className="p-2 bg-black text-white rounded w-content shrink-0 sm:shrink"
              onClick={(e) => limpiarFiltros(e)}
            >
              Limpiar
            </button>
          </form>
        </div>
        {errorMessage != null && <div>{errorMessage}</div>}
        {datos != null && (
          <DataTable
            columns={columns}
            data={datos}
            headerTitle={"Reporte"}
            headerDesc="Estos son los detalles del reporte"
            ctaDesc="Dejar queja o sugerencia"
            ctaVisible={false}
            ctaLink="/quejas-y-sugerencias/nueva"
            ctaPriv={["gerente"]}
            filter_placeholder={"Buscar por numero de contrato"}
            filter_key={"contrato"}
          />
        )}
      </div>
    </div>
  );
}
