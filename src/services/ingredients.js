import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataIngredients: null,
  cartIngredients: [],
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
    },
    moveIngredient: (state, action) => {
      const [indexDrag, indexDrop] = action.payload;
      const newArr = state.cartIngredients;
      [newArr[indexDrag], newArr[indexDrop]] = [
        newArr[indexDrop],
        newArr[indexDrag],
      ];
      state.cartIngredients = newArr;
    },
    removeIngredient: (state, action) => {
      state.cartIngredients = state.cartIngredients.filter(
        (_, index) => index !== action.payload
      );
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
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
