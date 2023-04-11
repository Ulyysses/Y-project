import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataIngredients: null,
  cartIngredients: [
    {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "bun",
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      __v: 0,
    },
  ],
  countIngredient: {},
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
  },
});

export const {
  setIngredients,
  addIngredient,
  removeIngredient,
  moveIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
