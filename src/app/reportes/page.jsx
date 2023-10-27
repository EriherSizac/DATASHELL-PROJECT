/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-10-25 10:33:26
 * @modify date 2023-10-25 10:33:26
 * @desc Página de reportes
 */

"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/Table/dataTable";
import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useAuth } from "@/components/AuthComponent";

function formatDate(timestamp) {
  // Función que parsea un timestamp a dd/mm/yyyy
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatFloatWithTwoDecimals(number) {
  // función que coloca dos decimales siempre a un float
  if (isNaN(number)) {
    return "Invalid number";
  }

  // Use toFixed to round to two decimals
  const formattedNumber = parseFloat(number).toFixed(2);

  return formattedNumber;
}

export default function Reportes() {
  const [errorMessage, setErrorMessage] = useState(null); // para mostrar errores
  const [datos, setDatos] = useState(null); // para guardar los datos
  const [isOpenModal, setIsOpenMOdal] = useState(false); //para el modal
  const [DatosCsv, setDatosCsv] = useState({}); // para guardar los datos a descargar
  const {  loadingToast } = useAuth(); // obtenemos para hacer el toast
  const refRoles = useRef(); // ref para el dropdown
  const refAsuntos = useRef(); // ref para el dropdown
  const montos_filtro = ["500", "1000"]; // estado para guardar los montos a renderizar para filtro
  const [bancosFiltro, setbancosFiltro] = useState([]); // Estado para guardar los bancos para renderizar para el sorting
  const [appliedFilters, setappliedFilters] = useState({
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    bancos: [],
    montos: [montos_filtro[0]],
    empresas: ["Din Express"],
  });

  // Función que obtiene todos los bancos disponibles y los coloca en el dropdown
  async function getBancos() {
    var url =
      process.env.NEXT_PUBLIC_backEnd + "gerente/obtener-bancos?reverse=false";
    var authToken = localStorage.getItem("authToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }).catch((error) => {
      console.log(error);
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        console.log(json);
        setbancosFiltro(json);
        setappliedFilters({ ...appliedFilters, bancos: [json[0].nombre] });
      } else {
        console.log(json);
      }
    } else {
    }
  }

  async function getReportes() {
    var url = process.env.NEXT_PUBLIC_backEnd + `gerente/generar-reporte`;
    loadingToast('Obteniendo datos', "empleados", "pending");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fechas: [
          formatDate(appliedFilters.fecha_inicio),
          formatDate(appliedFilters.fecha_fin),
        ],
        bancos: appliedFilters.bancos,
        montos: appliedFilters.montos,
        empresas: ["Din Express"],
      }),
    }).catch((error) => {
      console.log(error);
      loadingToast('Error: ' + error, "empleados", "error");
    });
    if (response != null) {
      const json = await response.json();
      if (response.status == 200) {
        loadingToast('Datos cargados', "empleados", "success");
        setDatos(json.DatosTabla);
        setDatosCsv(json.DatosCsv);
      } else {
        if (response.status == 401) {
          setIsOpenMOdal(true);
          loadingToast('Error: ' + json.error, "empleados", "error");
        }
        console.log(json);
        setErrorMessage(json.error);
        setDatos([]);
        loadingToast('Error: ' + json.error, "empleados", "error");
      }
    }
  }

  const handleMultiSelectChange = (name, id) => {
    // Función que modifica los filtros de multiselect
    if (name === "bancos_filtro") {
      let bancos = [];
      if (appliedFilters.bancos.includes(id)) {
        bancos = appliedFilters.bancos.filter((item) => item !== id);
        setappliedFilters({ ...appliedFilters, bancos });
      } else {
        setappliedFilters({
          ...appliedFilters,
          bancos: [...appliedFilters.bancos, id],
        });
      }
    } else {
      let montos = [];
      if (appliedFilters.montos.includes(id)) {
        montos = appliedFilters.montos.filter((item) => item !== id);
        setappliedFilters({ ...appliedFilters, montos });
      } else {
        montos = [...appliedFilters.montos, id];
        setappliedFilters({ ...appliedFilters, montos: montos });
      }
    }
  };

  function handleDateRangeChange(e) {
    const { endDate, startDate } = e.selection;
    console.log(endDate, startDate);
    setappliedFilters({
      ...appliedFilters,
      fecha_inicio: startDate,
      fecha_fin: endDate,
    });
  }

  useEffect(() => {
    // Obtenemos los bancos para los filtros
    getBancos();
    document.querySelector(".rdrDefinedRangesWrapper").style.display = "none";
    setTimeout(() => {
      document.querySelector("#loader").style.opacity = "0";
      setTimeout(() => {
        document.querySelector("#loader").style.display = "none";
      }, 200);
    }, 200);
  }, []);

  useEffect(() => {
    //Obtenemos los reportes cada vez que cambian los filtros
    getReportes();
  }, [appliedFilters]);

  const columns = [
    {
      accessorKey: "a_empleado",
      header: "Nombre Empleado",
    },
    {
      accessorKey: "b_rfc",
      header: "RFC",
    },
    {
      accessorKey: "c_empresa",
      header: "Empresa",
    },
    {
      accessorKey: "d_id_adelanto",
      header: "# Contrato",
    },
    {
      accessorKey: "e_fecha",
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
      accessorKey: "f_fecha_pago",
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
      accessorKey: "g_numero_cuenta",
      header: "Numero Cuenta",
    },
    {
      accessorKey: "h_nombre_banco",
      header: "Banco",
    },
    {
      accessorKey: "i_solicitado",
      header: "Solicitado",
      cell: (row) => {
        return `$${row.getValue("solicitado")}`;
      },
    },
    {
      accessorKey: "j_gastos_admin",
      header: "Gastos Adm. Interés",
      cell: (row) => {
        return `$${formatFloatWithTwoDecimals(row.getValue("gastos_adm"))}`;
      },
    },
    {
      accessorKey: "k_comision_bancaria",
      header: "Comisión Bancaria",
      cell: (row) => {
        return `$${formatFloatWithTwoDecimals(row.getValue("com_banc"))}`;
      },
    },
    {
      accessorKey: "l_subtotal",
      header: "Sub. Total",
      cell: (row) => {
        return `$${formatFloatWithTwoDecimals(row.getValue("sub_total"))}`;
      },
    },
    {
      accessorKey: "m_iva",
      header: "IVA",
      cell: (row) => {
        return `$${formatFloatWithTwoDecimals(row.getValue("iva"))}`;
      },
    },
    {
      accessorKey: "n_transferencia",
      header: "Transferencia",
      cell: (row) => {
        return `$${formatFloatWithTwoDecimals(row.getValue("transferencia"))}`;
      },
    },
  ];

  return (
    <>
      <div className="overflow-y-auto pb-[40vh] sm:pb-0 flex flex-col fixed transition-all duration-200 ease bg-yellow-400 translate-y-[90vh] lg:translate-y-[90vh] hover:translate-y-[25vh] 2xl:hover:translate-y-[50vh] h-screen z-[999] border border-black rounded-[8px] p-2 w-full shadow-2xl ml-[-1.25rem]">
        <div className="pb-1 w-full text-center text-xl font-bold">
          Filtros adicionales
        </div>
        <form className="flex flex-row sm:flex-row sm:items-start flex-wrap sm:flex-nowrap sm:justify-start gap-4">
          <div className="flex flex-col gap-4 w-full sm:w-full">
            <div className="flex flex-col">
              <div>Selecciona los bancos para filtrar</div>
              <div className="flex flex-row max-w-screen sm:max-w-1/4 gap-4 flex-wrap bg-yellow-500 p-5 rounded-[8px] max-h-[10rem] overflow-y-auto noBar">
                {bancosFiltro.map((banco) => {
                  return (
                    <div
                      key={banco.id}
                      onClick={() => {
                        handleMultiSelectChange("bancos_filtro", banco.nombre);
                      }}
                      className={`cursor-pointer transition-all ease duration-200 cursor pointer shrink-0 w-max p-2 rounded-[10px] ${
                        appliedFilters.bancos?.includes(banco.nombre)
                          ? "bg-yellow-400"
                          : "bg-white"
                      } ${
                        appliedFilters.bancos?.includes(banco.nombre)
                          ? "hover:bg-white"
                          : "hover:bg-yellow-400"
                      }`}
                    >
                      {banco.nombre}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col">
              <div>Selecciona los montos para filtrar</div>
              <div className="flex flex-row max-w-screen sm:max-w-1/4 gap-4 flex-wrap bg-yellow-500 p-5 rounded-[8px] max-h-[10rem] overflow-y-auto noBar">
                {montos_filtro.map((monto, key) => {
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        handleMultiSelectChange("montos_filtro", monto);
                      }}
                      className={`cursor-pointer transition-all ease duration-200 cursor pointer shrink-0 w-max p-2 rounded-[10px] ${
                        appliedFilters.montos?.includes(monto)
                          ? "bg-yellow-400"
                          : "bg-white"
                      } ${
                        appliedFilters.montos?.includes(monto)
                          ? "hover:bg-white"
                          : "hover:bg-yellow-400"
                      }`}
                    >
                      {monto}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full sm:w-1/2">
            <div className="flex flex-col">
              <div>Selecciona la fecha inicial</div>

              <DateRangePicker
                ranges={[
                  {
                    startDate: appliedFilters.fecha_inicio,
                    endDate: appliedFilters.fecha_fin,
                    key: "selection",
                  },
                ]}
                dateDisplayFormat="d/MMM/yyyy"
                onChange={(e) => {
                  handleDateRangeChange(e);
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24 pb-12">
        <div
          className="absolute w-screen h-screen bg-yellow-400 z-[9999] transition-all ease duration-200"
          id="loader"
        ></div>
        <div className="container mx-auto py-10">
          {errorMessage != null && <div>{errorMessage}</div>}
          {datos != null && (
            <DataTable
              columns={columns}
              data={datos}
              datosDescarga={DatosCsv}
              headerTitle={"Reporte"}
              headerDesc="Estos son los detalles del reporte"
              ctaDesc="Dejar queja o sugerencia"
              ctaVisible={false}
              ctaLink="/quejas-y-sugerencias/nueva"
              ctaPriv={["gerente"]}
              filter_placeholder={"Buscar por RFC"}
              filter_key={"b_rfc"}
              refresh={getReportes}
            />
          )}
        </div>
      </div>
    </>
  );
}
