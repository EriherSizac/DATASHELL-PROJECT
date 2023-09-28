"use client";
import Image from "next/image";
import { useAuth } from "@/components/AuthComponent";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function Home({ children }) {
  const { privilegios, authToken, empresa, closeSession, nombreEmpleado } =
    useAuth();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('authToken') == null) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="flex flex-col content-center items-start gap-5 min-h-screen justify-start pt-24">
      <div className="text-center min-w-full text-center">
        <h1>
          Hola {nombreEmpleado} de {empresa}
        </h1>
      </div>
      <div className="flex flex-col min-w-full">
        <p className="text-xl text-center">Como {privilegios} puedes:</p>

        {privilegios == "gerente" && (
          <Link href="" className="text-center hover:italic hover:font-bold">
            Gestionar operadores
          </Link>
        )}
        {(privilegios == "gerente") | (privilegios == "operador") ? (
          <Link
            href="/empleados"
            className="text-center hover:italic hover:font-bold"
          >
            {privilegios == "operador"
              ? "Agregar empleados"
              : privilegios == "gerente" && "Gestionar empleados"}
          </Link>
        ) : (
          ""
        )}
        {(privilegios == "gerente") | (privilegios == "operador") ? (
          <Link href="/quejas-y-sugerencias" className="text-center hover:italic hover:font-bold">
            Ver quejas y sugerencias
          </Link>
        ) : (
          ""
        )}
        {privilegios == "gerente" && (
          <Link href="" className="text-center hover:italic hover:font-bold">
            Ver reportes
          </Link>
        )}

        {authToken != null && (
          <button
            className="bg-black text-white p-2 min-w-fit block md:hidden"
            onClick={closeSession}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
}
