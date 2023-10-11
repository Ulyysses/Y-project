import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { Middleware } from "redux";

interface WebSocketActions {
  wsConnectionSuccess: ActionCreatorWithPayload<any, string>;
  wsConnectionError: ActionCreatorWithPayload<any, string>;
  wsConnectionClosed: ActionCreatorWithPayload<any, string>;
  wsGetMessage: ActionCreatorWithPayload<MessageEvent<any>, string>;
  wsConnectionStart: ActionCreatorWithoutPayload<string>;
  wsSendMessage?: ActionCreatorWithoutPayload<string>;
}

export const socketMiddleware = (
  wsUrl: string,
  wsActions: WebSocketActions
): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;

      const {
        wsConnectionSuccess,
        wsConnectionError,
        wsConnectionClosed,
        wsGetMessage,
        wsConnectionStart,
        wsSendMessage,
      } = wsActions;

      if (!socket && type === wsConnectionStart().type) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess(event));
        };

        socket.onerror = (event) => {
          console.error(event);
          dispatch(wsConnectionError(event));
        };

        socket.onmessage = (event) => {
          dispatch(wsGetMessage(event));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed(event));
        };

        if (type === wsSendMessage?.().type) {
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  };
};
