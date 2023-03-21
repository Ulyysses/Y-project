import ingredientsSlice from "../ingredients";
import modalSlice from "../modal";

export const rootReducer = {
  reducer: {
    ingredients: ingredientsSlice,
    modal: modalSlice,
  },
};
