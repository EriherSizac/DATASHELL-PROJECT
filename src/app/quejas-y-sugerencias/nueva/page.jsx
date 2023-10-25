/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-28 10:34:45
 * @modify date 2023-10-25 10:34:45
 * @desc Página que muestra una tabla de quejas y sugerencias que se han recibido
 */

"use client";
import { useEffect, useState } from "react";
import { dialCodes } from "@/components/dialCodes";
import Modal from "@/components/Modal/Modal";

export default function NuevaQueja() {
  const [tipoUsuario, setTipoUsuario] = useState("empleado"); // estado para guardar el tipo de empleado, por defecto empleado
  const [tipoTicket, setTipoTicket] = useState("queja"); // estado para guardar el tipo de ticket, por defecto "queja"
  const [asunto, setAsunto] = useState(""); // estado para guardar el asunto
  const [descripcion, setDescripcion] = useState(""); // estado para guardar los detalles del ticket
  const [tipoContacto, setTipoContacto] = useState(
    "No quiero que me contacten"
  ); // estado para guardar los tipos de contacto, por defecto "no contactar"
  const [contacto, setContacto] = useState(""); // estado para guardar el medio de contacto
  const [countryCode, setCountryCode] = useState("+52"); // estado para guardar el country code

  const tipos_usuario = ["empleado", "operador", "gerente"]; // tipos de usuario posibles
  const tipos_ticket = ["queja", "sugerencia", "otro"]; // tipos de ticket posibles
  const tipos_contacto = ["No quiero que me contacten", "telefono", "correo"]; // tipos de contacto posibles

  const [message, setMessage] = useState(""); // para mostrar mensajes
  const [quejaEnviada, setQuejaEnviada] = useState(false); // para guardar el estado del envío

  // función que envía un ticket a la base de datos
  async function enviarTicket(e) {
    e != undefined && e.preventDefault();
    // verificamos que los campos estén rellenos
    if (
      (tipoUsuario != "") &
      (tipoTicket != "") &
      (asunto != "") &
      (descripcion != "") &
      // verificamos que si no quiere ser contactado entonces esté vacío el campo
      ((tipoContacto == "No quiero que me contacten" && contacto == "") ||
        // y si si quiere, entocnes que lo haya rellenado
        (tipoContacto != "No quiero que me contacten" && contacto != ""))
    ) {
      var url = process.env.NEXT_PUBLIC_backEnd + "gerente/crear-ticket";
      var authToken = localStorage.getItem("authToken");
      const body = {
        tipo_usuario: tipoUsuario,
        tipo_ticket: tipoTicket,
        asunto: asunto,
        descripcion: descripcion,
        tipo_contacto: tipoContacto,
        contacto: contacto,
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
          // si todo bien desplegmaos mensajes
          console.log(response.body);
          setQuejaEnviada(true);
          setTimeout(() => {
            limpiarCampos();
          }, 1500);
        } else {
          // sino, desplegamos mensaje de error
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

  // funcion para manejar el codigo de pais
  function handleCountryCode(e) {
    setCountryCode(e.target.value);
  }

  // funcion para manejar el  asunto
  function handleAsunto(e) {
    setAsunto(e.target.value);
  }

  // funcion para manejar los detalles
  function handleDescripcion(e) {
    setDescripcion(e.target.value);
  }
  // funcion para manejar el medio de contacto
  function handleContacto(e) {
    if (tipoContacto == "telefono") {
      // si es telefono, validamos con regex
      var re = /^[0-9]{0,10}$/;
      if (re.test(e.target.value) || e.target.value == "") {
        setContacto(countryCode + "1" + e.target.value);
      } else {
        e.target.value = e.target.value.slice(0, -1);
      }
    } else {
      if (tipoContacto == "correo") {
        // si es correo, lo colocamos
        setContacto(e.target.value);
      } else {
        // si no queremos contacto, lo ponemos blanco
        setContacto("");
      }
    }
  }

  // funcion para manejar el tipo de usuarioo
  function handleTipoUsuario(e) {
    setTipoUsuario(e.target.value);
  }

  // funcion para manejar el tipo de ticket
  function handleTipoTicket(e) {
    setTipoTicket(e.target.value);
  }

  // funcion para manejar el tipo de contacto
  function handleTipoContacto(e) {
    setTipoContacto(e.target.value);
  }
  // funcion para limpiar los campos
  function limpiarCampos(e) {
    e != undefined && e.preventDefault();
    setAsunto("");
    setContacto("");
    setDescripcion("");
    var inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });
    var inputs = document.querySelectorAll("textarea");
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  return (
    <div className="pt-20 pb-10">
      <div className="min-h-screen w-full max-w-3xl flex flex-col gap-4 align-center items-center content-center">
        <div className="flex flex-col gap-4 align-center items-center content-center">
          <h1>Queremos escucharte</h1>
          <p>
            Agradecemos el tiempo que te tomas para dejarnos tu
            retroalimentación.
          </p>
        </div>
        <form className="w-full sm:w-2/3">
          <div>
            ¿Por qué nos contactas?
            <select
              className="p-3 border-black border rounded min-w-full mb-4"
              placeholder="Banco"
              onChange={(e) => {
                handleTipoTicket(e);
              }}
            >
              {tipos_ticket.map((usuario, key) => {
                return (
                  <option value={usuario} key={key}>
                    {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {" "}
            Asunto
            <input
              className="p-3 border-black border rounded min-w-full mb-4"
              placeholder="Asunto por el cual nos contactas"
              onChange={(e) => {
                handleAsunto(e);
              }}
            ></input>
          </div>
          <div>
            Cuéntanos un poco más de detalles
            <textarea
              cols="40"
              rows="5"
              className="p-3 border-black border rounded min-w-full mb-4"
              placeholder="Cuentanos un poco más"
              onChange={(e) => {
                handleDescripcion(e);
              }}
            ></textarea>
          </div>

          <div>
            Si te gustaría que nos contactaramos contigo para atender tu
            solicitud, elige un medio de contacto
            <select
              className="p-3 border-black border rounded min-w-full mb-4"
              placeholder="Banco"
              onChange={(e) => {
                handleTipoContacto(e);
              }}
            >
              {tipos_contacto.map((usuario, key) => {
                var medio = usuario.charAt(0).toUpperCase() + usuario.slice(1);
                medio = medio == "Telefono" ? "Teléfono" : medio;
                return (
                  <option value={usuario} key={key}>
                    {usuario == "telefono"
                      ? "Contáctenme por teléfono"
                      : usuario == "correo"
                      ? "Contáctenme por " + usuario
                      : usuario}
                  </option>
                );
              })}
            </select>
            {tipoContacto == "telefono" && (
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
                  placeholder="Escribe tu teléfono celular"
                  onChange={(e) => {
                    handleContacto(e);
                  }}
                ></input>
              </div>
            )}
            {tipoContacto == "correo" && (
              <input
                className="p-3 border-black border rounded min-w-full mb-4"
                placeholder="Escribe tu correo"
                onChange={(e) => {
                  handleContacto(e);
                }}
              ></input>
            )}
          </div>

          <div>
            Selecciona tu rol en la plataforma
            <select
              className="p-3 border-black border rounded min-w-full mb-4"
              placeholder="Banco"
              onChange={(e) => {
                handleTipoUsuario(e);
              }}
            >
              {tipos_usuario.map((usuario, key) => {
                return (
                  <option value={usuario} key={key}>
                    {usuario.charAt(0).toUpperCase() + usuario.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="bg-black p-4 text-white w-full border border-black"
              onClick={(e) => {
                enviarTicket(e);
              }}
            >
              Enviar {tipoTicket == "otro" ? "ticket" : tipoTicket}
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
        isOpen={quejaEnviada}
        onClose={() => {
          setQuejaEnviada(false);
        }}
        buttonCloseText={`Enviar algo más`}
        modalHeader={
          tipoTicket == "otro"
            ? "Hemos recibido tu ticket"
            : `Hemos recibido tu ${tipoTicket}`
        }
      >
        <div className="text-center">
          Hemos recibido tu mensaje, agradecemos mucho que hayas tomado el
          tiempo de retroalimentarnos.
        </div>
      </Modal>
    </div>
  );
}
