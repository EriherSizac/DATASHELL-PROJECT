"use client";
import { useRouter } from "next/navigation";

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [nombreEmpleado, setNombreEmpleado] = useState(null);
  const [privilegios, setPrivilegios] = useState(null);
  const router = useRouter();

  function saveToken(token) {
    localStorage.setItem("authToken", token);
    setAuthToken(token);
  }

  async function checkAuth() {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
    if (token == null) {
      if (location.pathname != "/auth/login") {
        router.push("/auth/login");
      }
    }
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

  async function closeSession() {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setEmpresa(null);
    setPrivilegios(null);
    setNombreEmpleado(null);
    router.push("/auth/login");
  }

  // Obtenemos el nivel de accceso
  useEffect(() => {
    checkAuth();
    setInterval(() => {
      checkAuth();
      console.log("checked");
    }, 300000);
  }, []);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
