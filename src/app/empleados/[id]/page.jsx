"use client";

import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { dialCodes } from "@/components/dialCodes";
import Modal from "@/components/Modal/Modal";

export default function NuevoEmpleado() {
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [rfc, setRfc] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [telefonoCasa, setTelefonoCasa] = useState("");
  const [numCuenta, setNumCuenta] = useState("");
  const [banco, setBanco] = useState("");
  const [countryCode, setCountrCode] = useState("+52");
  const [direccion, setDireccion] = useState("");
  const { privilegios } = useAuth();
  const [bancos, setBancos] = useState([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [empresa, setEmpresa] = useState(1); // ELIMINAR DESPUES
  const [id, setId] = useState(null);
  const [currentBanco, setCurrentBanco] = useState("");
  const bancoRef = useRef();
  const params = useParams();

  const fetchData = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_backEnd + "gerente/detalles-empleado?id=" + id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setNombreCompleto(data.nombre);
        setRfc(data.rfc);
        setCorreo(data.correo);
        const celular_length = data.celular.length - 10;
        setCelular(data.celular.substring(celular_length));
        setTelefonoCasa(data.telefono_casa);
        setDireccion(data.direccion);
        setNumCuenta(data.numero_cuenta);
        setCurrentBanco(data.banco);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    id != null && fetchData();
  }, [id]);

  useEffect(() => {
    privilegios != "gerente" && router.push("/");
    id == null && setId(params.id.toString());
  }, []);

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
        setBancos(json);
        setBanco(json[0].id);
      } else {
        console.log(json);
        setMessage(json.error);
        setTimeout(() => {
          setMessage("");
        }, 2500);
      }
    } else {
      setMessage("Rellena todos los campos");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  async function actualizarEmpleado(e) {
    e != undefined && e.preventDefault();
    if (
      (nombreCompleto != "") &
      (rfc != "") &
      (correo != "") &
      (celular != "") &
      (telefonoCasa != "") &
      (numCuenta != "") &
      (banco != "") &
      (direccion != "")
    ) {
      var url = process.env.NEXT_PUBLIC_backEnd + "gerente/edit-empleado";
      var authToken = localStorage.getItem("authToken");
      const body = {
        nombre: nombreCompleto,
        celular: countryCode + "1" + celular,
        direccion: direccion,
        rfc: rfc,
        correo: correo,
        numero_cuenta: numCuenta,
        banco: banco,
        telefono_casa: telefonoCasa,
        empresa: empresa,
        id:id
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        console.log(error);
      });
      if (response != null) {
        if (response.status == 200) {
          console.log(response.body);
          setMessage("Registrado con éxito. Limpiando...");
          setTimeout(() => {
            limpiarCampos();
          }, 1500);
        } else {
          const json = await response.json();
          console.log(json);
          setMessage(json.error);
          setTimeout(() => {
            setMessage("");
          }, 2500);
        }
      }
    } else {
      setMessage("Rellena todos los campos");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }

  function handleNombre(e) {
    setNombreCompleto(e.target.value);
  }

  function handleRfc(e) {
    var newRFc = e.target.value;
    if (newRFc.length < 14) {
      console.log("gere");
      setRfc(newRFc);
    } else {
      e.target.value = rfc;
    }
  }

  function handleCorreo(e) {
    setCorreo(e.target.value);
  }

  function handleCelular(e) {
    var re = /^[0-9]{0,10}$/;
    if (re.test(e.target.value) || e.target.value == "") {
      setCelular(e.target.value);
    } else {
      e.target.value = celular;
    }
  }

  function handleTelCasa(e) {
    setTelefonoCasa(e.target.value);
    var re = /^[0-9]{0,12}$/;
    if (re.test(e.target.value) || e.target.value == "") {
      setTelefonoCasa(e.target.value);
    } else {
      e.target.value = celular;
    }
  }

  function handleNumCuenta(e) {
    setNumCuenta(e.target.value);
  }

  function handleBanco(e) {
    setBanco(e.target.value);
  }

  function handleDireccion(e) {
    setDireccion(e.target.value);
  }
  function handleCountryCode(e) {
    setCountrCode(e.target.value);
  }

  function limpiarCampos(e) {
    e != undefined && e.preventDefault();
    setDireccion("");
    setNombreCompleto("");
    setRfc("");
    setCelular("");
    setCorreo("");
    setMessage("");
    setNumCuenta("");
    setTelefonoCasa("");
    var inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  useEffect(() => {
    getBancos();
  }, []);

  useEffect(() => {
    bancos.map((banco_item, key) => {
      if (banco_item.nombre == currentBanco) {
        bancoRef.current.selectedIndex = key;
        setBanco(banco_item.id)
      }
    });
  }, [currentBanco, bancos]);

  return (
    <div className="pt-20 pb-10">
      <div className="min-h-screen w-full max-w-3xl flex flex-col gap-4 align-center items-center content-center">
        <div className="flex flex-col gap-4 align-center items-center content-center">
          <h1>Llena el formulario</h1>
          <p>Utiliza los datos del empleado para llenar el formulario</p>
        </div>
        <form className="w-full sm:w-2/3">
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Nombre completo del empleado"
            onChange={(e) => {
              handleNombre(e);
            }}
            value={nombreCompleto}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="RFC"
            value={rfc}
            onChange={(e) => {
              handleRfc(e);
            }}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Correo"
            value={correo}
            onChange={(e) => {
              handleCorreo(e);
            }}
          ></input>
          <div className="flex gap-4">
            <select
              className="p-3 border-black border rounded w-15 mb-4"
              placeholder="Código de país"
              onChange={(e) => {
                handleCountryCode(e);
              }}
            >
              <option value="+52">+52</option>
              {dialCodes.map((dialCode, key) => {
                return (
                  <option value={dialCode.dial_code} key={key}>
                    {dialCode.dial_code}
                  </option>
                );
              })}
            </select>
            <input
              className="p-3 border-black border rounded w-full mb-4"
              placeholder="Celular"
              value={celular}
              onChange={(e) => {
                handleCelular(e);
              }}
            ></input>
          </div>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Teléfono de casa"
            value={telefonoCasa}
            onChange={(e) => {
              handleTelCasa(e);
            }}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Número de cuenta"
            value={numCuenta}
            onChange={(e) => {
              handleNumCuenta(e);
            }}
          ></input>
          <select
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Banco"
            ref={bancoRef}
            onChange={(e) => {
              handleBanco(e);
            }}
          >
            {bancos.map((banco, key) => {
              return (
                <option value={banco.id} key={key}>
                  {banco.nombre}
                </option>
              );
            })}
          </select>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => {
              handleDireccion(e);
            }}
          ></input>
          <div className="flex flex-col gap-4">
            <button
              className="bg-black p-4 text-white w-full border border-black"
              onClick={(e) => {
                actualizarEmpleado(e);
              }}
            >
              Actualizar empleado
            </button>
            <button
              className="bg-white p-4 text-black w-full border border-black"
              onClick={(e) => {
                limpiarCampos(e);
              }}
            >
              Limpiar formulario
            </button>
          </div>
          <div>{message}</div>
        </form>
      </div>
      <Modal
        isOpen={message != ""}
        onClose={() => {
          setMessage("");
        }}
        buttonCloseText={`Volver al formulario`}
        modalHeader={message}
      ></Modal>
    </div>
  );
}
