import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loginRequest,
  logoutRequest,
  getUserRequest,
  refreshRequest,
} from "./api";

import { getCookie, setCookie } from "../utils/cookie";

const AuthContext = React.createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useProvideAuth() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const signIn = async (form) => {
    setIsLoading(true);
    const data = await loginRequest(form).then((res) => {
      return res.json();
    });

    if (data.success) {
      const authToken = data.accessToken.split("Bearer ")[1];
      const refreshToken = data.refreshToken;
      setCookie("accessToken", authToken, { expires: 1200 });
      setCookie("refreshToken", refreshToken);
      setUser({ email: data.user.email, name: data.user.name });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const dispatch = useDispatch();

  const signOut = async () => {
    setIsLoading(true);
    const data = await logoutRequest().then((res) => {
      return res.json();
    });

    if (data.success) {
      setCookie("accessToken", null);
      setCookie("refreshToken", null);
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
    setIsLoading(false);
  };

  const checkToken = async () => {
    if (
      !isAuthenticated &&
      getCookie("accessToken") !== "null" &&
      getCookie("accessToken") !== undefined
    ) {
      setIsLoading(true);
      const data = await getUserRequest().then((res) => {
        return res.json();
      });
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    }
  };

  const checkTokenRefresh = async () => {
    if (
      getCookie("accessToken") === "null" ||
      getCookie("accessToken") === undefined
    ) {
      setIsLoading(true);
      const dataToken = await refreshRequest().then((res) => {
        return res.json();
      });
      if (dataToken.success) {
        const authToken = dataToken.accessToken.split("Bearer ")[1];
        const refreshToken = dataToken.refreshToken;
        setCookie("accessToken", authToken, { expires: 1200 });
        setCookie("refreshToken", refreshToken);
        setIsAuthenticated(true);
        const data = await getUserRequest().then((res) => {
          return res.json();
        });
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        }
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    checkTokenRefresh();
  }, []);

  return {
    user,
    signIn,
    signOut,
    isAuthenticated,
    checkToken,
    checkTokenRefresh,
    isLoading,
  };
}

export function useAuth() {
  return React.useContext(AuthContext);
}
