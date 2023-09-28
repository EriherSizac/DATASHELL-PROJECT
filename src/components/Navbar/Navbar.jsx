"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthComponent";

export default function Navbar() {
  const [mobileNavVisibility, setMobileNavVisibility] = useState("hidden");
  const router = useRouter();
  const {privilegios, authToken, empresa, closeSession} = useAuth();

  // Nav menu mobile
  function toggleNavigationPanel() {
    if (mobileNavVisibility == "hidden") {
      setMobileNavVisibility("flex");
    } else {
      setMobileNavVisibility("hidden");
    }
  }

  function endSession(){
    setMobileNavVisibility('hidden');
    closeSession();
    
  }

  return (
    <div>
      <div className="absolute w-full pt-5 pb-3 flex flex-row justify-between gap-7 border-b border-black px-10 items-center">
        <div
          className="max-h-10 max-w-0-xs flex flex-row min-w-fit cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <svg
            width="63"
            height="28"
            viewBox="0 0 63 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.564453 21.5H13.2485V17.944H5.10045V1.48001H0.564453V21.5Z"
              fill="black"
            />
            <path
              d="M21.587 18.728C19.291 18.728 18.003 17.048 18.003 14.248V14.024C18.003 11.224 19.347 9.60002 21.587 9.60002C23.855 9.60002 25.171 11.28 25.171 14.08V14.276C25.171 17.048 23.855 18.728 21.587 18.728ZM21.559 21.808C25.955 21.808 29.287 18.868 29.287 14.248V14.024C29.287 9.46002 25.983 6.52002 21.587 6.52002C17.191 6.52002 13.859 9.51602 13.859 14.108V14.332C13.859 18.896 17.191 21.808 21.559 21.808Z"
              fill="black"
            />
            <path
              d="M37.665 26.904C42.481 26.904 45.3649 24.692 45.3929 20.352V6.85602H41.361V9.04002C40.521 7.55602 39.0929 6.52002 36.7129 6.52002C33.0729 6.52002 30.2729 9.46002 30.2729 13.66V13.856C30.2729 18.196 33.1009 20.856 36.6569 20.856C38.8129 20.856 40.549 19.568 41.361 18.14V20.352C41.361 22.648 40.129 23.936 37.665 23.936C35.593 23.936 34.669 23.096 34.417 21.808H30.3849C30.7769 24.832 32.933 26.904 37.665 26.904ZM37.861 17.804C35.845 17.804 34.417 16.292 34.417 13.856V13.632C34.417 11.224 35.677 9.60002 37.945 9.60002C40.1569 9.60002 41.4729 11.112 41.4729 13.604V13.8C41.4729 16.292 39.989 17.804 37.861 17.804Z"
              fill="black"
            />
            <path
              d="M54.9616 18.728C52.6656 18.728 51.3776 17.048 51.3776 14.248V14.024C51.3776 11.224 52.7216 9.60002 54.9616 9.60002C57.2296 9.60002 58.5456 11.28 58.5456 14.08V14.276C58.5456 17.048 57.2296 18.728 54.9616 18.728ZM54.9336 21.808C59.3296 21.808 62.6616 18.868 62.6616 14.248V14.024C62.6616 9.46002 59.3576 6.52002 54.9616 6.52002C50.5656 6.52002 47.2336 9.51602 47.2336 14.108V14.332C47.2336 18.896 50.5656 21.808 54.9336 21.808Z"
              fill="black"
            />
          </svg>
          <div className="ps-2.5">{`${
            empresa != null ? `| ${empresa}` : ""
          }`}</div>
        </div>
        <div className="flex flex-row justify-evenly max-width-ful hidden md:block">
          <div className="flex flex-row justify-between gap-4 items-center">
            {privilegios == "gerente" && <Link className="text-center hover:italic hover:font-bold" href="" >Operadores</Link>}
            {(privilegios == "gerente" | privilegios =='operador') ? <Link href="/empleados" className="text-center hover:italic hover:font-bold"> Empleados</Link> : ''}
            {(privilegios == "gerente") | (privilegios == "operador") ? (
              <Link href="/quejas-y-sugerencias" className="text-center hover:italic hover:font-bold">Quejas y sugerencias</Link>
            ) : (
              ""
            )}
            {privilegios == "gerente" && <Link href="" className="text-center hover:italic hover:font-bold"> Reportes</Link>}
          </div>
        </div>
        {authToken != null && (
          <button
            className="bg-black text-white p-2 min-w-fit hidden md:block"
            onClick={endSession}
          >
            Cerrar sesión
          </button>
        )}
        <div
          className="bg-black text-white px-3 py-2 min-w-fit cursor-pointer md:hidden"
          onClick={toggleNavigationPanel}
        >
          Menú
        </div>
      </div>
      <div
        className={`${mobileNavVisibility} flex-col justify-top pt-20 gap-4 items-center absolute inset-0 bg-black text-white`}
      >
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

        {privilegios == "gerente" && <Link href="" className="text-center hover:italic hover:font-bold">Operadores</Link>}
        {(privilegios == "gerente" | privilegios =='operador') ? <Link href="/empleados" className="text-center hover:italic hover:font-bold"> Empleados</Link> : ''}
        {(privilegios == "gerente") | (privilegios == "operador") ? (
          <Link href="/quejas-y-sugerencias" className="text-center hover:italic hover:font-bold">Quejas y sugerencias</Link>
        ) : (
          ""
        )}
        {privilegios == "gerente" && <Link href="" className="text-center hover:italic hover:font-bold"> Reportes</Link>}

        {authToken != null && (
          <button
            className="bg-white text-black p-2 min-w-fit block md:hidden"
            onClick={endSession}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
}
