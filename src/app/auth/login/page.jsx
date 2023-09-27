"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";

export default function Login() {
  // Para guardar si está logeado o no
  const { authToken } = useAuth();
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const router = useRouter();
  // Provider
  const { setPrivilegios, saveToken, setEmpresa, setNombreEmpleado } =
    useAuth();

  async function checkLogin() {
    //var token = localStorage.getItem("authToken");
    console.log(authToken);
    if (authToken != null) {
      var url = "auth/me";
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
          setPrivilegios(json.tipo);
          saveToken(json.token);
          setEmpresa(json.empresa);
          setNombreEmpleado(json.nombre);
          setMessage("Inicio exitoso, redirigiendo...");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      }
    }
  }
  useEffect(() => {
    // Verificamos primero si ya está logeado o no
    checkLogin;
  }, []);

  // Para el forms
  function handleUser(e) {
    setUser(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function showMessage(msg){
    setMessage(msg);
    setTimeout(()=>{setMessage(null)}, 2500)
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (user != null && user != "" && password != null && password != "") {
      var url = process.env.NEXT_PUBLIC_backEnd + "auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      }).catch((error) => {
        console.log(error);
      });
      if (response != null) {
        const json = await response.json();
        if (response.status == 200) {
          console.log(json);
          setPrivilegios(json.tipo);
          saveToken(json.token);
          setEmpresa(json.empresa);
          setNombreEmpleado(json.nombre);
          showMessage("Inicio exitoso, redirigiendo...");
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
        else{
          showMessage(json.error)
        }
      }
    }
    else{
      showMessage('Rellena todos los campos.')
    }
  }

  return (
    <div className="flex flex-col content-center items-center gap-5 min-h-screen justify-center">
      <div>
        <h1 className="text-center">Inicia sesión para acceder</h1>
      </div>
      <p className="text-xl text-center">
        Ingresa tu usuario y contraseña para acceder.
      </p>
      <form className="w-full max-w-md">
        <div className="flex flex-col gap-4 w-full">
          <input
            placeholder="Usuario"
            className="border-black border rounded p-1.5"
            type="text"
            onChange={(e) => {
              handleUser(e);
            }}
          ></input>
          <input
            placeholder="Contraseña"
            className="border-black border rounded p-1.5"
            type="password"
            onChange={(e) => {
              handlePassword(e);
            }}
          ></input>
        </div>

        <button
          className="border-black border rounded p-1.5 bg-black text-white w-full mt-4"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Iniciar sesión
        </button>
        {message != null && <div>{message}</div>}
      </form>
    </div>
  );
}
