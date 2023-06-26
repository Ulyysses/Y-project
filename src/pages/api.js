import { getCookie } from "../utils/cookie";

const domain = "https://norma.nomoreparties.space";

export const loginRequest = async (form) => {
  const api = `${domain}/api/auth/login`;
  return await fetch(api, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(form),
  });
};

export const logoutRequest = async () => {
  const api = `${domain}/api/auth/logout`;
  return await fetch(api, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

export const refreshRequest = async () => {
  const api = `${domain}/api/auth/token`;
  return await fetch(api, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
};

export const getUserRequest = async () => {
  const api = `${domain}/api/auth/user`;
  return await fetch(api, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const refreshUserRequest = async (value) => {
  const api = `${domain}/api/auth/user`;
  return await fetch(api, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(value),
  });
};

export const resetPassword = async (value) => {
  const api = `${domain}/api/password-reset/reset`;
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const forgotPassword = async (value) => {
  const api = `${domain}/api/password-reset`;
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const register = async (value) => {
  const api = `${domain}/api/auth/register`;
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });
};

export const ingredientsList = async () => {
  const api = `${domain}/api/ingredients`;
  return await fetch(api);
};

export const order = async (ingredientsId) => {
  const api = `${domain}/api/orders`;
  return await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
};
