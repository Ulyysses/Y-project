import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginRequest,
  logoutRequest,
  getUserRequest,
  refreshRequest,
} from "../utils/api";

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
  const [isActivePasswordReset, setIsActivePasswordReset] =
    React.useState(false);
  const [hasError, setHasError] = React.useState();

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

    if (!data.success) {
      setHasError(data.message);
    }

    setIsLoading(false);
  };

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
    if (getCookie("refreshToken") === "null") {
      return null;
    } else {
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
    }
  };

  const checkTokenRefresh = async () => {
    if (getCookie("refreshToken") === "null") {
      setIsLoading(false);
    } else {
      if (
        getCookie("accessToken") === "null" ||
        getCookie("accessToken") === undefined
      ) {
        setIsLoading(true);
        const dataToken = await refreshRequest().then((res) => res.json());
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
    }
  };

  const access = getCookie("accessToken");

  useEffect(() => {
    console.log("gfgfg");
    checkToken();
    checkTokenRefresh();
  }, [access]);

  return {
    user,
    signIn,
    signOut,
    isAuthenticated,
    checkToken,
    checkTokenRefresh,
    isLoading,
    isActivePasswordReset,
    setIsActivePasswordReset,
    hasError,
    setHasError,
  };
}

export function useAuth() {
  return React.useContext(AuthContext);
}
