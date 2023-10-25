/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-26 10:26:13
 * @modify date 2023-10-25 10:46:13
 * @desc Página que permite registrar empleados
 */

"use client";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dialCodes } from "@/components/dialCodes";
import Modal from "@/components/Modal/Modal";

export default function NuevoEmpleado() {
  // Definimos todos los estados para guardar la info del empleado
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

  // Verificamos los privilegios del usuario
  useEffect(() => {
    privilegios != "operador" && router.push("/");
  }, []);

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

  // Función que verifica el llenado de todos los campos y manda el request al backend
  async function registrarEmpleado(e) {
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
      var url = process.env.NEXT_PUBLIC_backEnd + "operador/create-empleado";
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

  // Función que actualiza el estado del nombre
  function handleNombre(e) {
    setNombreCompleto(e.target.value);
  }

  // Función que actualiza el estado del rfc y hace una comprobación de longitud
  function handleRfc(e) {
    var newRFc = e.target.value;
    if (newRFc.length < 14) {
      console.log("gere");
      setRfc(newRFc);
    } else {
      e.target.value = rfc;
    }
  }

  // función que actualzia el estado del correo
  function handleCorreo(e) {
    setCorreo(e.target.value);
  }

  // Función que actualiza el estado del celular y lo comprueba usando regex
  function handleCelular(e) {
    var re = /^[0-9]{0,10}$/;
    if (re.test(e.target.value) || e.target.value == "") {
      setCelular(e.target.value);
    } else {
      e.target.value = celular;
    }
  }
  // Función que actualiza el estado del telefono de casa y lo comprueba usando regex
  function handleTelCasa(e) {
    setTelefonoCasa(e.target.value);
    var re = /^[0-9]{0,12}$/;
    if (re.test(e.target.value) || e.target.value == "") {
      setTelefonoCasa(e.target.value);
    } else {
      e.target.value = celular;
    }
  }

  // Función que actualiza el estado del numero de cuenta
  function handleNumCuenta(e) {
    setNumCuenta(e.target.value);
  }

  // Funcion que actualiza el estado del banco del empleado
  function handleBanco(e) {
    setBanco(e.target.value);
  }

  // Función que actualiza la dirección del empleado
  function handleDireccion(e) {
    setDireccion(e.target.value);
  }

  // Funciópn que actualiza el estado del código de país del empleado
  function handleCountryCode(e) {
    setCountrCode(e.target.value);
  }

  // Función que limpia los campos del formulario
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
     // Cuandos e cargue la página, obtenemos todos los bancos
    getBancos();
  }, []);

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
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="RFC"
            onChange={(e) => {
              handleRfc(e);
            }}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Correo"
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
              onChange={(e) => {
                handleCelular(e);
              }}
            ></input>
          </div>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Teléfono de casa"
            onChange={(e) => {
              handleTelCasa(e);
            }}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Número de cuenta"
            onChange={(e) => {
              handleNumCuenta(e);
            }}
          ></input>
          <select
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Banco"
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
            onChange={(e) => {
              handleDireccion(e);
            }}
          ></input>
          <div className="flex flex-col gap-4">
            <button
              className="bg-black p-4 text-white w-full border border-black"
              onClick={(e) => {
                registrarEmpleado(e);
              }}
            >
              Registrar empleado
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
