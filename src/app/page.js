"use client";
import Image from "next/image";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import ArrowButton from "@/components/Buttons/ArrowButton";

export default function Home({ children }) {
  const { privilegios, authToken, empresa, closeSession, nombreEmpleado } =
    useAuth();

  return (
    <div className="flex flex-col content-center items-center gap-5 min-h-screen justify-center ">
      <div className="flex flex-col content-center items-start gap-5 justify-start bg-slate-200 p-6 max-w-2xl rounded-xl">
        <div className="text-center min-w-full text-center">
          {authToken != null ? (
            <h1>
              Hola {nombreEmpleado} de {empresa}
            </h1>
          ) : (
            <h1>Te damos la bienvenida</h1>
          )}
        </div>
        {authToken != null ? (
          <div className="flex flex-col min-w-full">
            <p className="text-xl text-center">Como {privilegios} puedes:</p>

            {privilegios == "gerente" && (
              <ArrowButton href="" text="Gestionar operadores" />
            )}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <ArrowButton
                href="/empleados"
                text={`${
                  privilegios == "operador"
                    ? "Agregar empleados"
                    : privilegios == "gerente" && "Gestionar empleados"
                }`}
              />
            ) : (
              ""
            )}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <ArrowButton
                href="/quejas-y-sugerencias"
                text="Ver quejas y sugerencias"
              />
            ) : (
              ""
            )}
            {privilegios == "gerente" && (
              <ArrowButton href="" text="Ver reportes" />
            )}

            {authToken != null && (
              <button
                onClick={closeSession}
                className={` flex justify-center items-center text-center transition duration-100 hover:italic hover:font-bold hover:text-red-400`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-9 h-7"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                  ></path>
                </svg>
                Cerrar mi sesión
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col min-w-full">
            <p className="text-xl text-center pb-4">En este portal puedes:</p>
            <ArrowButton
              href="/auth/login"
              text="Iniciar sesión en tu cuenta"
            />
            <ArrowButton
              href="/quejas-y-sugerencias/nueva"
              text="Dejar una queja o sugerencia"
            />

            {authToken != null && (
              <button
                onClick={closeSession}
                className={` flex justify-center items-center text-center transition duration-100 hover:italic hover:font-bold hover:text-yellow-400`}
              >
                <svg
                  className="w-9 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                  ></path>
                </svg>
                Cerrar mi sesión
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
