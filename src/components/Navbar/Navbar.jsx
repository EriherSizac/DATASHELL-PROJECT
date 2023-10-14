"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthComponent";
import MenuPrincipal from "../MenuPrincipal";

export default function Navbar() {
  const [mobileNavVisibility, setMobileNavVisibility] = useState("hidden");
  const router = useRouter();
  const { privilegios, authToken, empresa, closeSession } = useAuth();

  // Nav menu mobile
  function toggleNavigationPanel() {
    console.log(mobileNavVisibility)
    if (mobileNavVisibility == "hidden") {
      setMobileNavVisibility("flex");
    } else {
      setMobileNavVisibility("hidden");
    }
  }

  function endSession() {
    closeSession();
  }

  return (
    <div>
      <div className="bg-white z-50 absolute w-full pt-5 pb-3 flex flex-row justify-between gap-7 border-b border-black px-10 items-center">
        <div
          className="max-h-10 max-w-0-xs flex flex-row min-w-fit cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            priority
            className="w-28"
            src="/logo.jpg"
            width="500"
            alt="Din express logo"
            height={250}
          />
          <div className="ps-2.5 hidden sm:block">{`${
            empresa != null ? `| ${empresa}` : ""
          }`}</div>
        </div>
        <div className="flex flex-row justify-evenly max-width-ful hidden lg:block">
          <div className="flex flex-row justify-between gap-4 items-center">
            {privilegios == "gerente" && (
              <Link className="text-center hover:text-yellow-400" href="/operadores">
                Operadores
              </Link>
            )}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <Link
                href="/empleados"
                className="text-center hover:text-yellow-400"
              >
                Empleados
              </Link>
            ) : (
              ""
            )}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <Link
                href="/solicitudes"
                className="text-center hover:text-yellow-400"
              >
                Ver solicitudes
              </Link>
            ) : (
              ""
            )}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <Link
                href="/quejas-y-sugerencias"
                className="text-center hover:text-yellow-400"
              >
                Quejas y sugerencias
              </Link>
            ) : (
              ""
            )}
            {privilegios == "gerente" && (
              <Link href="/reportes" className="text-center hover:text-yellow-400">
                {" "}
                Reportes
              </Link>
            )}
          </div>
        </div>
        {authToken != null && (
          <button
            className="bg-black text-white p-2 min-w-fit hidden lg:block"
            onClick={endSession}
          >
            Cerrar sesión
          </button>
        )}
        {authToken != null ? (
          <div
            className="bg-black text-white px-3 py-2 min-w-fit cursor-pointer lg:hidden"
            onClick={toggleNavigationPanel}
          >
            Menú
          </div>
        ) : (
          <Link
            className="bg-black text-white px-3 py-2 min-w-fit cursor-pointer "
            href="/auth/login"
          >
            Entrar a mi cuenta
          </Link>
        )}
      </div>
      <div
        className={`${mobileNavVisibility} absolute z-50 flex-col justify-top pt-20 gap-4 items-center absolute inset-0 bg-black text-white`}
      >
        <MenuPrincipal fun={()=>{toggleNavigationPanel()}} />
        <div
          className="absolute top-0 right-0 pr-3 pt-3 cursor-pointer"
          onClick={toggleNavigationPanel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="48px"
            height="48px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
