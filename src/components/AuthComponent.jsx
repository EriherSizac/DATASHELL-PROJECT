/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-09-26 10:42:29
 * @modify date 2023-10-25 10:45:29
 * @desc Componente para manejar la autenticación del usuario.
 */

"use client";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { toast, Toaster, ToastBar } from "react-hot-toast";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null); // para guardar el token de acceso
  const [empresa, setEmpresa] = useState(null); // para guardar la empresa a la que pertence
  const [nombreEmpleado, setNombreEmpleado] = useState(null); // para guardar el nombre del empleado
  const [privilegios, setPrivilegios] = useState(null); // para guardar su nivel de acceso
  const router = useRouter(); // para redirigir
  const [toastId, setToastId] = useState(null); // para guardar el id del toast y no repetir

  // función que guarda el token en local storage
  function saveToken(token) {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  }

  // función que valida la sesión del usuario
  async function checkAuth() {
    const token = localStorage.getItem("authToken"); // obtenemos token
    setAuthToken(token);
    // si el token es nulo y no estamos en una de las locaciones "permitidas", entonces redirigimos
    if (
      token == null &&
      location.pathname != "/quejas-y-sugerencias/nueva" &&
      location.pathname != "/tyc"
    ) {
      if (location.pathname != "/auth/login") {
        router.push("/");
      }
    }
    // si el token no es nulo, validamos la sesión
    if (token != null) {
      const url = process.env.NEXT_PUBLIC_backEnd + "auth/validate-session";
      // fetch POST methon with the url passing the token and the new status
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).catch((error) => {
        //console.log(error);
        console.log("error");
        if (location.pathname != "/auth/login") {
          closeSession();
          router.push("/auth/login");
        }
      });
      if (response != null) {
        const json = await response.json();
        if (response.status == 200) {
          console.log(json);
          setPrivilegios(json.tipo);
          setAuthToken(token);
          setEmpresa(json.empresa);
          setNombreEmpleado(json.nombre);
        } else {
          if (location.pathname != "/auth/login") {
            closeSession();
            router.push("/auth/login");
          }
        }
      }
    }
  }

  // función que cierra la sesión del usuario
  async function closeSession() {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setEmpresa(null);
    setPrivilegios(null);
    setNombreEmpleado(null);
    router.push("/");
  }

  // Obtenemos el nivel de accceso
  useEffect(() => {
    checkAuth();
  }, []);

  // función que genera toasts con acción
  const loadingToast = (message, id, status = "pending") => {
    if (status === "pending") {
      if (id === toastId) return;
      setToastId(id);
      toast.loading(message, {
        id,
      });
    }

    if (status === "success") {
      toast.success(message, {
        id,
      });
      setToastId(null);
    } else if (status === "error") {
      toast.error(message, {
        id,
      });
      setToastId(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authToken,
        empresa,
        privilegios,
        nombreEmpleado,
        setNombreEmpleado,
        setEmpresa,
        saveToken,
        setPrivilegios,
        closeSession,
        checkAuth,
        loadingToast
      }}
    >
      <Toaster position="bottom-center">
        {(t) => (
          <ToastBar
            toast={t}
            //style={{}} // Overwrite styles
            position="bottom-center" // Used to adapt the animation
          />
        )}
      </Toaster>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
