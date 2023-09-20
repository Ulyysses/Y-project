import ordersSlice, {
  wsGetOrders,
  wsConnectionStart,
  wsConnectionClosed,
  wsConnectionSuccess,
  wsConnectionError,
} from "./orders";

describe("orders reducer", () => {
  it("should return the initial state", () => {
    expect(ordersSlice(undefined, {})).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
    });
  });

  it("should handle wsConnectionSuccess action", () => {
    expect(
      ordersSlice(
        {
          wsConnected: false,
        },
        wsConnectionSuccess(true)
      )
    ).toEqual({
      wsConnected: true,
    });
  });

  it("should handle wsConnectionError action", () => {
    expect(
      ordersSlice(
        {
          wsConnected: true,
          error: undefined,
        },
        wsConnectionError("Connection error message")
      )
    ).toEqual({
      wsConnected: false,
      error: "Connection error message",
    });
  });

  it("should handle wsConnectionClosed action", () => {
    expect(
      ordersSlice(
        {
          wsConnected: true,
        },
        wsConnectionClosed(false)
      )
    ).toEqual({
      wsConnected: false,
    });
  });

  it("should handle wsGetOrders action", () => {
    expect(
      ordersSlice(
        {
          orders: null,
          error: "someError",
        },
        wsGetOrders({
          orders: ["order1", "order2"],
        })
      )
    ).toEqual({
      orders: ["order1", "order2"],
      error: undefined,
    });
  });

  it("should handle wsConnectionStart action", () => {
    expect(
      ordersSlice(
        { wsConnected: false, orders: null, error: undefined },
        wsConnectionStart({
          wsConnected: false,
          orders: null,
          error: undefined,
        })
      )
    ).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
    });
  });
});
