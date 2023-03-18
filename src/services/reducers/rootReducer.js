// import { combineReducers } from 'redux';
import ingredientsSlice from "../ingredients";

export const rootReducer = {
  reducer: {
    ingredients: ingredientsSlice,
  },
};
