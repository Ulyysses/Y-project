import { getCookie } from "../utils/cookie";

export const loginRequest = async (form) => {
  const api = "https://norma.nomoreparties.space/api/auth/login";
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
  const api = "https://norma.nomoreparties.space/api/auth/logout";
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
  const api = "https://norma.nomoreparties.space/api/auth/token";
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
  const api = "https://norma.nomoreparties.space/api/auth/user";
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
  const api = "https://norma.nomoreparties.space/api/auth/user";
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
