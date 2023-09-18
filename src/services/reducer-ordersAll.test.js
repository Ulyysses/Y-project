import allOrdersSlice, {
  allConnectionError,
  allConnectionClosed,
  allConnectionSuccess,
  allGetOrders,
  allConnectionStart,
} from "./ordersAll";

describe("allOrders reducer", () => {
  it("should return the initial state", () => {
    expect(allOrdersSlice(undefined, {})).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
      total: null,
      totalToday: null,
    });
  });

  it("should handle allConnectionSuccess action", () => {
    expect(
      allOrdersSlice(
        {
          wsConnected: false,
        },
        allConnectionSuccess(true)
      )
    ).toEqual({
      wsConnected: true,
    });
  });

  it("should handle allConnectionError action", () => {
    expect(
      allOrdersSlice(
        {
          wsConnected: true,
          error: undefined,
        },
        allConnectionError("Connection error message")
      )
    ).toEqual({
      wsConnected: false,
      error: "Connection error message",
    });
  });

  it("should handle allConnectionClosed action", () => {
    expect(
      allOrdersSlice(
        {
          wsConnected: true,
        },
        allConnectionClosed(false)
      )
    ).toEqual({
      wsConnected: false,
    });
  });

  it("should handle allGetOrders action", () => {
    expect(
      allOrdersSlice(
        {
          orders: null,
          error: undefined,
          total: null,
          totalToday: null,
        },
        allGetOrders({
          orders: ["order1", "order2"],
          error: undefined,
          total: "numberTotal",
          totalToday: "numberTotalToday",
        })
      )
    ).toEqual({
      orders: ["order1", "order2"],
      error: undefined,
      total: "numberTotal",
      totalToday: "numberTotalToday",
    });
  });

  it("should handle allConnectionStart action", () => {
    expect(
      allOrdersSlice(
        {
          wsConnected: false,
          orders: null,
          error: undefined,
          total: null,
          totalToday: null,
        },
        allConnectionStart({
          wsConnected: false,
          orders: null,
          error: undefined,
          total: null,
          totalToday: null,
        })
      )
    ).toEqual({
      wsConnected: false,
      orders: null,
      error: undefined,
      total: null,
      totalToday: null,
    });
  });
});
