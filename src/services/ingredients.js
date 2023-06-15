import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils/local-storage";

const initialState = {
  dataIngredients: null,
  cartIngredients: getLocalStorage("constructor") ?? [],
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.dataIngredients = action.payload;
    },
    addIngredient: (state, action) => {
      const newIngredient = action.payload;
      if (newIngredient.type === "bun") {
        state.cartIngredients = state.cartIngredients.filter(
          (ingredient) => ingredient.type !== newIngredient.type
        );
      }
      state.cartIngredients.push(newIngredient);
      setLocalStorage("constructor", state.cartIngredients);
    },
    moveIngredient: (state, action) => {
      const [indexDrag, indexDrop] = action.payload;
      const newArr = state.cartIngredients;
      [newArr[indexDrag], newArr[indexDrop]] = [
        newArr[indexDrop],
        newArr[indexDrag],
      ];
      state.cartIngredients = newArr;
      setLocalStorage("constructor", state.cartIngredients);
    },
    removeIngredient: (state, action) => {
      state.cartIngredients = state.cartIngredients.filter(
        (_, index) => index !== action.payload
      );
      setLocalStorage("constructor", state.cartIngredients);
    },
    removeAll: (state) => {
      state.cartIngredients = [];
      setLocalStorage("constructor", state.cartIngredients);
    },
  },
});

export const {
  setIngredients,
  addIngredient,
  removeIngredient,
  moveIngredient,
  removeAll,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
