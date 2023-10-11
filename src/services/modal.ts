import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  modalOrderNumber: number | null;
} = {
  modalOrderNumber: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOrderNumber: (state, action) => {
      state.modalOrderNumber = action.payload;
    },
    clearModal: () => initialState,
  },
});

export const { setModalOrderNumber, clearModal } = modalSlice.actions;

export default modalSlice.reducer;
