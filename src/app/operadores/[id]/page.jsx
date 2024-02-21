/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-27 10:26:45
 * @modify date 2023-10-25 10:26:45
 * @desc Página que permite actualizar o eliminar un operador
 */

"use client";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function EditarOperador() {
  const [nombreCompleto, setNombreCompleto] = useState(""); // guardar nombre
  const [username, setUsername] = useState(""); // estado para guardar usuario
  const [password, setPassword] = useState(""); // estado para guardar contraseña
  const [message, setMessage] = useState(""); // estado para mostrar mensajes
  const [eliminarMensaje, setEliminarMensaje] = useState("Eliminar acceso"); // estado para el botón de eliminar
  const [timer, setTimer] = useState(5); //tiempo inicial del contador
  const [id, setId] = useState(); // guarda el id del operador a modificar
  const [interval, setInter] = useState(null); // estado para concoer el tiempo del countdown de eliminacion

  const { privilegios } = useAuth(); // obtenemos privilegios
  const router = useRouter(); // para redirigir
  const params = useParams(); // sacamos los query params

  // sacamos la info del operador
  const fetchData = async () => {
    try {
      const url =
        process.env.NEXT_PUBLIC_backEnd + "gerente/buscar-operador?id=" + id;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("authToken"),
        },
      });

      const data = await response.json();
      if (response.ok) {
        // si todo bien desplegamos la info
        console.log(data);
        setNombreCompleto(data.nombre);
        setUsername(data.username);
      }else{
        // sino, mostramos mensaje y vamos para atrás.
        toast('Este operador no existe. Redirigiendo...');
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // obtenemos los datos si aún no se ha hecho
    id != null && fetchData();
  }, [id]);

  useEffect(() => {
    // verificamos privilegios
    privilegios != "gerente" && router.push("/");
    // sacamos datos de los aprams
    id == null && setId(params.id.toString());
  }, []);

  // función que actualiza los datos de un opreador
  async function actualizarOperador(e) {
    e != undefined && e.preventDefault();
    // se verifica que se rellene al menos el nombre y el usuario
    if ((nombreCompleto != "") & (username != "")) {
      var url = process.env.NEXT_PUBLIC_backEnd + "gerente/editar-operador";
      console.log(url);
      var authToken = localStorage.getItem("authToken");
      const body = {
        id: id,
        nombre: nombreCompleto,
        username: username,
        password: password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        console.log("error", error);
      });
      if (response != null) {
        if (response.status == 200) {
          console.log(response.body);
          toast("Datos actualizados con éxito.");
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
      toast("Rellena al menos nombre y usuario");
    }
  }

  // función que elimina un operador
  async function eliminarOperador(e) {
    e != undefined && e.preventDefault();
    if ((nombreCompleto != "") & (username != "")) {
      var url = process.env.NEXT_PUBLIC_backEnd + "gerente/eliminar-operador";
      console.log(url);
      var authToken = localStorage.getItem("authToken");
      const body = {
        id: id,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }).catch((error) => {
        console.log("error", error);
      });
      if (response != null) {
        if (response.status == 200) {
          console.log(response.body);
          toast("Operador eliminado con éxito.");
          setTimeout(() => {
            router.push("/operadores");
          }, 1000);
        } else {
          const json = await response.json();
          console.log(json);
          setMessage(json.error);
          setTimeout(() => {
            router.push("/operadores");
          }, 1000);
        }
      }
    } else {
      toast("Rellena todos los campos");
    }
  }

  // Funcion para manejar el nombnre
  function handleNombre(e) {
    setNombreCompleto(e.target.value);
  }

  // Funcion para manejar el username
  function handleUsername(e) {
    setUsername(e.target.value);
  }

  // Funcion para manejar el password
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // función para limpiar los campos
  function limpiarCampos(e) {
    e != undefined && e.preventDefault();
    setUsername("");
    setPassword("");
    setNombreCompleto("");
  }

  // Función que inicia un contador hacia abajo de 5 segundos y modifica el texto del botón
  function startTimer(duration) {
    let timer = duration;
    setEliminarMensaje(
      `¿CONFIRMAS LA ELIMINACION DEL USUARIO ${username}? ${timer}s`
    );

    const intervalId = setInterval(() => {
      if (--timer > 0) {
        setEliminarMensaje(
          `¿CONFIRMAS LA ELIMINACION DEL USUARIO ${username}? ${timer}s`
        );
      } else {
        clearInterval(intervalId);
        setEliminarMensaje("Eliminar acceso");
      }
    }, 1000);

    setInter(intervalId); // Save the interval ID to state
  }

  // Función que verifica el estado del botón e inicia un contador para eliminar el operador
  function eliminarOperadorPre(e) {
    e.preventDefault();
    if (eliminarMensaje == "Eliminar acceso") {
      // si es el estado iniciar, se inicia un contador de 5 segundos
      startTimer(5);
      return;
    } else {
      //Si se vuelve a presionar en los proximos 5 segundos se elimina el operador
      eliminarOperador();
    }
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
        <div className="flex flex-col gap-4 align-center items-center content-center text-center">
          <h1>Datos del operador</h1>
          <p>Estos son los datos del operador, puedes actualizarlos.</p>
        </div>
        <form className="w-full sm:w-2/3">
          Nombre completo
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Nombre completo del operador"
            onChange={(e) => {
              handleNombre(e);
            }}
            value={nombreCompleto}
          ></input>
          Nombre de usuario
          <input
            className="p-3 border-black border rounded min-w-full mb-4"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => {
              handleUsername(e);
            }}
          ></input>
          Contraseña (dejar en blanco para no actualizar)
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
                actualizarOperador(e);
              }}
            >
              Actualizar datos de operador
            </button>
            <button
              className="bg-white p-4 text-black w-full border border-black"
              onClick={(e) => {
                limpiarCampos(e);
              }}
            >
              Limpiar formulario
            </button>
            <button
              className={`${
                eliminarMensaje == "Eliminar acceso"
                  ? "bg-red-400"
                  : "bg-red-700"
              } p-4 text-white w-full border border-black`}
              onClick={(e) => {
                eliminarOperadorPre(e);
              }}
            >
              {eliminarMensaje}
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
