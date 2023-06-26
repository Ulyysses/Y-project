import PropTypes from "prop-types";
import { Navigate, useLocation, createSearchParams } from "react-router-dom";

import { useAuth } from "../pages/auth";
import Loading from "../components/loading/Loading";

export function ProtectedRouteElement({ element }) {
  const { isAuthenticated, isLoading } = useAuth();

  let location = useLocation();

  const redirect = createSearchParams(
    `redirect=${location.pathname}`
  ).toString();

  if (isLoading) {
    return <Loading style={{ height: "70vh" }} />;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={{ pathname: "/login", search: `?${redirect}` }} replace />
  );
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element.isRequired,
};
