import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIngredient: null,
  modalOrderNumber: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIngredient: (state, action) => {
      state.modalIngredient = action.payload;
    },
    setModalOrderNumber: (state, action) => {
      state.modalOrderNumber = action.payload;
    },
    clearModal: () => initialState,
  },
});

export const { setModalIngredient, setModalOrderNumber, clearModal } =
  modalSlice.actions;

export default modalSlice.reducer;
