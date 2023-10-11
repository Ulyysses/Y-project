/* eslint-disable no-undef */
import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginRequest,
  logoutRequest,
  getUserRequest,
  refreshRequest,
} from "../utils/api";
import { getCookie, setCookie } from "../utils/cookie";

interface IContext {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isActivePasswordReset: boolean;
  hasError: string;
  signIn: (form: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  checkToken: () => Promise<void>;
  checkTokenRefresh: () => Promise<void>;
  setIsActivePasswordReset: (value: boolean) => void;
  setHasError: (value: string) => void;
}

interface IProvideAuth {
  children: ReactNode;
}

interface IUser {
  email: string;
  name: string;
}

const AuthContext = React.createContext<IContext>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isActivePasswordReset: false,
  hasError: "",
  signIn: async () => {},
  signOut: async () => {},
  checkToken: async () => {},
  checkTokenRefresh: async () => {},
  setIsActivePasswordReset: async () => {},
  setHasError: async () => {},
});

export function ProvideAuth({ children }: IProvideAuth) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useProvideAuth() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isActivePasswordReset, setIsActivePasswordReset] =
    React.useState(false);
  const [hasError, setHasError] = React.useState("");

  const refreshToken = getCookie("refreshToken");

  const [accessToken, setAccessToken] = useState(
    getCookie("accessToken") || "null"
  );

  const signIn = async (form: { email: string; password: string }) => {
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
      setCookie("accessToken", "null");
      setCookie("refreshToken", "null");
      setUser(null);
      setIsAuthenticated(false);
      navigate("/login");
    }
    setIsLoading(false);
  };

  const checkToken = async () => {
    if (refreshToken === "null" || refreshToken === undefined) {
      return;
    }

    if (
      !isAuthenticated &&
      accessToken !== "null" &&
      accessToken !== undefined
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
    if (refreshToken === "null" || refreshToken === undefined) {
      setIsLoading(false);
    } else {
      if (accessToken === "null" || accessToken === undefined) {
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

  useEffect(() => {
    const OnCookieEvent = async () => {
      const value = getCookie("accessToken") || "null";

      if (accessToken !== value) {
        setAccessToken(value);
      }
    };

    // @ts-expect-error
    cookieStore.addEventListener("change", OnCookieEvent);

    return () => {
      // @ts-expect-error
      cookieStore.removeEventListener("change", OnCookieEvent);
    };
  }, [accessToken]);

  useEffect(() => {
    checkToken();
    checkTokenRefresh();
  }, [accessToken]);

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
