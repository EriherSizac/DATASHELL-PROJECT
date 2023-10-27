/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-28 10:34:45
 * @modify date 2023-10-25 10:34:45
 * @desc Página que muestra una lista de solicitudes que se han recibido
 */
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
const notifyCancel = () => toast("Cancelación exitosa");
const notifyPayment = () => toast("Pago exitoso");

export default function Solicitudes() {
  const [errorMessage, setErrorMessage] = useState(null); // para mostrar errores
  const [adelantos, setAdelantos] = useState([]); // para guardar la lista de solicitudes
  const [monto, setMonto] = useState("todos"); // para los filtros por monto
  const [estatus, setEstatus] = useState("todos"); // para los filtros por estatus
  const [isOpenModal, setIsOpenMOdal] = useState(false); // para controlar el modal
  const { privilegios, loadingToast } = useAuth(); // para verificar privilegios
  const montos_dropdown = ["500", "1000"]; // para el filtro de mopntos
  const estatus_dropdown = ["creado", "pagado", "cancelado"]; // para el filtro de estatus
  const [empleadoDetalles, setEmpleadoDetalles] = useState(-1); // para guardar la solicitud
  const [modalHeader, setmodalHeader] = useState(""); // para guardar el header del modal
  const [accionEmpleado, setAccionEmpleado] = useState(-1); // para guardar el index de la solicitud actual
  const [DatosCsv, setDatosCsv] = useState({}); // para guardar los datos a descargar

  // función que obtiene todas las solicitudes
  async function getSolicitudes() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      `gerente/obtener-adelantos?monto=${monto}&estatus_adelanto=${estatus}`;
      loadingToast("Obteniendo datos", "empleados", "pending");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
      loadingToast('Error: ' + error, "empleados", "error");
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        console.log(json);
        loadingToast('Datos cargados', "empleados", "success");
        setAdelantos(json.DatosTabla);
        setDatosCsv(json.DatosCsv);
      } else {
        if (response.status == 401) {
          setIsOpenMOdal(true);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setAdelantos([]);
        loadingToast('Error: ' + json.error, "empleados", "error");
      }
    }
  }

  // función para cancelar una solicitud
  async function cancelarSolicitud(id) {
    var url = process.env.NEXT_PUBLIC_backEnd + `operador/cancelar-adelanto`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).catch((error) => {
      console.log(error);
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        console.log(json);
        setAccionEmpleado(-1);
        notifyCancel();
        getSolicitudes();
      } else {
        if (response.status == 401) {
          setAccionEmpleado(-1);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setAccionEmpleado(-1);
      }
    }
  }

  // función para pagar una solicitud
  async function pagarSolicitud(id) {
    var url = process.env.NEXT_PUBLIC_backEnd + `gerente/pagar-adelanto`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).catch((error) => {
      console.log(error);
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        console.log(json);
        setAccionEmpleado(-1);
        notifyPayment();
        getSolicitudes();
      } else {
        if (response.status == 401) {
          setEmpleadoDetalles(-1);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setEmpleadoDetalles(-1);
      }
    }
  }

  function handleEstatus(e) {
    setEstatus(e.target.value);
  }
  function handleMontos(e) {
    setMonto(e.target.value);
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // función que devuelve el contenido del modal yu depdendiendo de los privilegios del usuari muestra el boton de cancelar o pagar adelanto
  function accionEnEmpleado() {
    if (accionEmpleado != -1) {
      var adelanto = adelantos[accionEmpleado];
      return (
        <div className="w-full flex items-center align-center justify-center p-4">
          <div className="w-full flex flex-col items-center align-center justify-center gap-2">
            <div className="w-full flex flex-col items-left align-center justify-left gap-2">
              <div>
                <div className="font-bold">Solicitado por:</div>{" "}
                {adelanto.nombre_empleado}
                <div className="font-bold">RFC:</div> {adelanto.rfc}
                <div className="font-bold">Monto:</div> ${adelanto.monto}
                <div className="font-bold">Solicitado en:</div> {adelanto.fecha}
              </div>
              {adelanto.estatus_adelanto == "creado" ? (
                privilegios == "operador" ? (
                  <div
                    onClick={() => {
                      cancelarSolicitud(adelanto.id_adelanto);
                    }}
                    className="cursor-pointer p-2 rounded bg-red-400 text-white w-max"
                  >
                    Confirmo la cancelación de la solicitud
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      pagarSolicitud(adelanto.id_adelanto);
                    }}
                    className="cursor-pointer rounded w-max p-2 bg-green-400 text-white"
                  >
                    Confirmo que fue pagado
                  </div>
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    getSolicitudes();
  }, []);

  // para cuando se filtren por monto y estatus
  useEffect(() => {
    getSolicitudes();
  }, [monto, estatus]);

  // para abrir el modal si el id del empleado es diferente de -1
  useEffect(() => {
    if (accionEmpleado != -1) {
      // si es un usuario, entonces colocamos el index de la lista de adelantos
      setmodalHeader(`Folio #${adelantos[accionEmpleado].id_adelanto}`);
      // si es un usuario, entonces abrimos modal
      setIsOpenMOdal(true);
    } else {
      setIsOpenMOdal(false);
    }
  }, [accionEmpleado]);

  const columns = [
    // configuramos las columnas de la tabla
    {
      accessorKey: "id_adelanto",
      header: "Folio",
      cell: ({ row }) => {
        return `#${row.getValue("id_adelanto")}`;
      },
    },
    {
      accessorKey: "nombre_empleado",
      header: "Nombre",
    },
    {
      accessorKey: "rfc",
      header: "RFC",
      cell: ({ row }) => {
        return (
          <div
            className="p-2 cursor-pointer hover:font-semibold hover:italic"
            onClick={() => {
              setEmpleadoDetalles(row.getValue("id_empleado"));
            }}
          >
            {row.getValue("rfc")}
          </div>
        );
      },
    },
    {
      accessorKey: "monto",
      header: "Monto",
      cell: (row) => {
        return <div>${numberWithCommas(row.getValue("monto"))}</div>;
      },
    },
    {
      accessorKey: "estatus_adelanto",
      header: "Estatus",
      cell: (row) => {
        var estatus = row.getValue("estatus_adelanto");
        // retornamos los distintos iconos dependiendo del estado
        return estatus == "pagado" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="w-9 h-7 text-green-400"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0z"
            ></path>
          </svg>
        ) : estatus == "cancelado" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="w-9 h-7 text-red-400"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm4.3 14.3a.996.996 0 0 1-1.41 0L12 13.41L9.11 16.3a.996.996 0 1 1-1.41-1.41L10.59 12L7.7 9.11A.996.996 0 1 1 9.11 7.7L12 10.59l2.89-2.89a.996.996 0 1 1 1.41 1.41L13.41 12l2.89 2.89c.38.38.38 1.02 0 1.41z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            className="w-9 h-7 text-yellow-400"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
            ></path>
          </svg>
        );
      },
    },
    {
      accessorKey: "fecha",
      // configuramos el filtro por fecha
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
      accessorKey: "id_empleado",
      header: "Acción",
      // configuramos las acciones dependiendo del estado
      cell: ({ row }) => {
        return (
          row.getValue("estatus_adelanto") === "creado" && (
            <div
              className="p-2 cursor-pointer hover:font-semibold hover:italic"
              onClick={() => {
                setAccionEmpleado(row.index);
              }}
            >
              {privilegios == "operador"
                ? "Cancelar pago"
                : privilegios == "gerente" && "Pagar"}
            </div>
          )
        );
      },
    },
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <div className="container mx-auto py-10">
        <Modal
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenMOdal(false);
            setEmpleadoDetalles(-1);
            setAccionEmpleado(-1);
          }}
          buttonCloseText="Cerrar"
          modalHeader={modalHeader}
        >
          {accionEmpleado > -1 && accionEnEmpleado()}
        </Modal>
        <div>
          <div>Filtros adicionales</div>
          <form className="flex gap-4">
            <select
              className="p-2 cursor-pointer border border-slate-700 rounded"
              onChange={(e) => {
                handleEstatus(e);
              }}
            >
              <option value="todos">Filtra por estatus</option>
              {estatus_dropdown.map((usuario, key) => {
                return (
                  <option value={usuario} key={key}>
                    {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                  </option>
                );
              })}
            </select>
            <select
              className="p-2 cursor-pointer border border-slate-700 rounded"
              onChange={(e) => {
                handleMontos(e);
              }}
            >
              <option value="todos">Filtra por monto</option>
              {montos_dropdown.map((usuario, key) => {
                return (
                  <option value={usuario} key={key}>
                    {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                  </option>
                );
              })}
            </select>
          </form>
        </div>
        {errorMessage != null && <div>{errorMessage}</div>}
        {adelantos != null && (
          <DataTable
            columns={columns}
            data={adelantos}
            headerTitle={"Solicitudes de empleados"}
            headerDesc="Estas son las solicitudes de empleados que se han recibido."
            ctaDesc=""
            ctaVisible={true}
            datosDescarga={DatosCsv}
            ctaLink=""
            ctaPriv={["gerente", "operador"]}
            filter_placeholder={"Buscar por RFC"}
            filter_key={"rfc"}
            refresh={getSolicitudes}
          />
        )}
      </div>
    </div>
  );
}
