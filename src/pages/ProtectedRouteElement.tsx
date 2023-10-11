import { Navigate, useLocation, createSearchParams } from "react-router-dom";

import { useAuth } from "./auth";
import Loading from "../components/loading/Loading";
import { ReactNode } from "react";

interface IProtectedRouteElement {
  element: ReactNode;
}

export function ProtectedRouteElement({ element }: IProtectedRouteElement) {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  const redirect = createSearchParams(
    `redirect=${location.pathname}`
  ).toString();

  if (isLoading) {
    return <Loading style={{ height: "70vh" }} />;
  }

  return isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to={{ pathname: "/login", search: `?${redirect}` }} replace />
  );
}
