import ArrowButton from "./Buttons/ArrowButton";
import { useAuth } from "./AuthComponent";

export default function MenuPrincipal({ fun }) {
  const { privilegios, authToken, empresa, closeSession } = useAuth();
  function endSession() {
    fun();
    closeSession();
  }

  return (
    <>
      {privilegios == "gerente" && (
        <div onClick={fun}>
          <ArrowButton href="/operadores" text="Gestionar operadores" />
        </div>
      )}
      {(privilegios == "gerente") | (privilegios == "operador") ? (
        <div onClick={fun}>
          <ArrowButton
            href="/empleados"
            text={`${
              privilegios == "operador"
                ? "Agregar empleados"
                : privilegios == "gerente" && "Gestionar empleados"
            }`}
          />
        </div>
      ) : (
        ""
      )}
      {(privilegios == "gerente") | (privilegios == "operador") ? (
        <div onClick={fun}>
          <ArrowButton href="/solicitudes" text={`Ver solicitudes`} />
        </div>
      ) : (
        ""
      )}
      {(privilegios == "gerente") | (privilegios == "operador") ? (
        <div onClick={fun}>
          <ArrowButton
            href="/quejas-y-sugerencias"
            text="Ver quejas y sugerencias"
          />
        </div>
      ) : (
        ""
      )}
      {privilegios == "gerente" && (
        <div onClick={fun}>
          <ArrowButton href="" text="Ver reportes" />
        </div>
      )}

      {authToken != null && (
        <button
          onClick={() => endSession()}
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
    </>
  );
}
