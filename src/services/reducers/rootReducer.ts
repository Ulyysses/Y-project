import ingredientsSlice from "../ingredients";
import modalSlice from "../modal";
import ordersSlice from "../orders";
import allOrdersSlice from "../ordersAll";

export const rootReducer = {
  reducer: {
    ingredients: ingredientsSlice,
    modal: modalSlice,
    orders: ordersSlice,
    allOrders: allOrdersSlice,
  },
};
