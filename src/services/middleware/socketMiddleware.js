export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

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

      if (!socket && type === wsConnectionStart.type) {
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
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(wsGetMessage(restParsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsConnectionClosed(event));
        };

        if (type === wsSendMessage?.type) {
          socket.send(JSON.stringify(payload));
        }
      }

      next(action);
    };
  };
};
