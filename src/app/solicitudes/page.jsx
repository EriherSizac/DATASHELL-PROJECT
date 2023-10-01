"use client";
"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthComponent";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import toast, { Toaster } from "react-hot-toast";
const notifyCancel = () => toast("Cancelación exitosa");
const notifyPayment = () => toast("Pago exitoso");

export default function Solicitudes() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [adelantos, setAdelantos] = useState([]);
  const [monto, setMonto] = useState("todos");
  const [estatus, setEstatus] = useState("todos");
  const [isOpenModal, setIsOpenMOdal] = useState(false);
  const router = useRouter();
  const { privilegios } = useAuth();
  const montos_dropdown = ["500", "1000"];
  const estatus_dropdown = ["creado", "pagado", "cancelado"];
  const [empleadoDetalles, setEmpleadoDetalles] = useState(-1);
  const [empleadoNombre, setEmpleadoNombre] = useState("");
  const [empleadoInfo, setEmpleadoInfo] = useState(null);
  const [accionEmpleado, setAccionEmpleado] = useState(-1);

  async function getSolicitudes() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      `gerente/obtener-adelantos?monto=${monto}&estatus_adelanto=${estatus}`;
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
        setAdelantos(json);
      } else {
        if (response.status == 401) {
          setIsOpenMOdal(true);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setAdelantos([]);
      }
    }
  }

  async function getEmpleadoDetalles() {
    var url =
      process.env.NEXT_PUBLIC_backEnd +
      `operador/detalles-empleado?id=${empleadoDetalles}`;
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
        setEmpleadoInfo(json);
        setEmpleadoNombre(json.nombre);
      } else {
        if (response.status == 401) {
          setEmpleadoInfo(null);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setEmpleadoInfo(null);
      }
    }
  }

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
          setEmpleadoInfo(null);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setEmpleadoInfo(null);
      }
    }
  }

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
          setEmpleadoInfo(null);
        }
        console.log(json);
        //setErrorMessage(json.error);
        setEmpleadoInfo(null);
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

  function verEmpleado() {
    console.log("EMPLEADO");
    if (empleadoInfo != null && empleadoDetalles != -1) {
      console.log(empleadoInfo.nombre);
      return (
        <div className="w-full flex items-center align-center justify-center p-4">
          <div className="w-full flex flex-col items-center align-center justify-center gap-2">
            <div className="w-full flex flex-col items-left align-center justify-left gap-2">
              <div>
                <div className="font-bold">Registrado en:</div>{" "}
                {empleadoInfo.creado_en}
              </div>
              <Link href={`mailto:${empleadoInfo.correo}`} target="_blank">
                <div className="font-bold">Correo:</div> {empleadoInfo.correo}
              </Link>
              <Link
                href={`https://api.whatsapp.com/send?phone=${empleadoInfo.celular}`}
                target="_blank"
              >
                <div className="font-bold">Celular:</div> {empleadoInfo.celular}
              </Link>
              <Link href={`tel:${empleadoInfo.celular}`} target="_blank">
                <div className="font-bold">Teléfono de casa:</div>{" "}
                {empleadoInfo.telefono_casa}
              </Link>
              <div className="font-bold">Dirección:</div>{" "}
              {empleadoInfo.direccion}
              <div className="font-bold">RFC:</div> {empleadoInfo.rfc}
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-row gap-4 w-full">
                  <div className="font-bold">Banco:</div>{" "}
                  <div className="">{empleadoInfo.banco}</div>
                </div>
                <div className="flex flex-row gap-4 w-full">
                  <div className="font-bold">N° de cuenta:</div>{" "}
                  <div>{empleadoInfo.numero_cuenta}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function accionEnEmpleado() {
    if (accionEmpleado != -1) {
      console.log("ACCION EN EMPLEADO");
      console.log(adelantos[accionEmpleado].nombre);
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

  // obtener info de un empleado cuando cambie la variable empleado detalles
  useEffect(() => {
    if (empleadoDetalles != -1) {
      getEmpleadoDetalles();
    } else {
    }
  }, [empleadoDetalles]);

  // para abrir el modal si empleado detalles es diferente de -1 o empleadoAccion
  useEffect(() => {
    if (empleadoDetalles != -1 || accionEmpleado != -1) {
      console.log(accionEmpleado, "here");
      if (accionEmpleado != -1) {
        setEmpleadoNombre(`Folio #${adelantos[accionEmpleado].id_adelanto}`);
      }
      setIsOpenMOdal(true);
    } else {
      setIsOpenMOdal(false);
    }
  }, [empleadoInfo, accionEmpleado]);

  const columns = [
    //we can set normal fields like this
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
      header: 'Acción',
      cell: ({ row }) => {
        return (
          row.getValue('estatus_adelanto') === 'creado' && <div
          className="p-2 cursor-pointer hover:font-semibold hover:italic"
          onClick={() => {
            setAccionEmpleado(row.index);
          }}
        >
          {privilegios == "operador"
            ? "Cancelar pago"
            : privilegios == "gerente" && "Pagar"}
        </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <Toaster />
      <div className="container mx-auto py-10">
        <Modal
          isOpen={isOpenModal}
          onClose={() => {
            setIsOpenMOdal(false);
            setEmpleadoDetalles(-1);
            setAccionEmpleado(-1);
          }}
          buttonCloseText="Cerrar"
          modalHeader={empleadoNombre}
        >
          {empleadoDetalles > 1
            ? verEmpleado()
            : accionEmpleado > -1 && accionEnEmpleado()}
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
            ctaVisible={false}
            ctaLink=""
            ctaPriv={[]}
            filter_placeholder={"Buscar por RFC"}
            filter_key={"rfc"}
          />
        )}
      </div>
    </div>
  );
}
