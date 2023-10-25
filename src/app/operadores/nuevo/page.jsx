/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-27 10:26:45
 * @modify date 2023-10-25 10:26:45
 * @desc Página que permite registrar un nuevo operador
 */

"use client";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { dialCodes } from "@/components/dialCodes";
import Modal from "@/components/Modal/Modal";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function NuevoOperador() {
  const [nombreCompleto, setNombreCompleto] = useState(""); // estado para el nombre
  const [username, setUsername] = useState(""); // estado para el nombre de usuario para acceso
  const [password, setPassword] = useState(""); // estado para la contraseña
  const [message, setMessage] = useState(""); // estado para desplegar mensajes
  const { privilegios } = useAuth(); // obtenemos privilegios del usuario
  const router = useRouter(); // para redirigir

  // verificamos privilegios
  useEffect(() => {
    privilegios != "gerente" && router.push("/");
  }, []);

  // función que crea un operador enviando los datos a la api
  async function crearOperador(e) {
    e != undefined && e.preventDefault();
    // verificamos que todos los campos estén llenos
    if ((nombreCompleto != "") & (username != "") & (password != "")) {
      var url = process.env.NEXT_PUBLIC_backEnd + "gerente/create-operador";
      var authToken = localStorage.getItem("authToken");
      const body = {
        nombre: nombreCompleto,
        username: username,
        password: password,
        empresa: 1
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
          // si todo bien, limpiamos campos y desplegamos mensaje
          console.log(response.body);
          toast(`Operador ${nombreCompleto} creado con éxito`);
          setTimeout(() => {
            limpiarCampos();
          }, 1000);
        } else {
          // si no, mostramos el error.
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

  // función para actualziar nombre
  function handleNombre(e) {
    setNombreCompleto(e.target.value);
  }

  // función poara actualizar nombre de usuario
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  // función para actualziar contraseña
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // función para limpiar campos
  function limpiarCampos(e) {
    e != undefined && e.preventDefault();
    setUsername("");
    setPassword("");
    setNombreCompleto("");
  }


  return (
    <div className="pt-20 pb-10">
      <Toaster position="bottom-center">
        {(t) => (
          <ToastBar
            toast={t}
            //style={{}} // Overwrite styles
            position="bottom-center" // Used to adapt the animation
          />
        )}
      </Toaster>
      <div className="min-h-screen w-full max-w-3xl flex flex-col gap-4 align-center items-center content-center">
        <div className="flex flex-col gap-4 align-center items-center content-center">
          <h1>Llena el formulario</h1>
          <p>Para crear el operador, llena el formulario</p>
        </div>
        <form className="w-full sm:w-2/3">
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Nombre completo del operador"
            onChange={(e) => {
              handleNombre(e);
            }}
            value={nombreCompleto}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => {
              handleUsername(e);
            }}
          ></input>
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              handlePassword(e);
            }}
          ></input>

          <div className="flex flex-col gap-4">
            <button
              className="bg-black p-4 text-white w-full border border-black"
              onClick={(e) => {
                crearOperador(e);
              }}
            >
              Registrar operador
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
