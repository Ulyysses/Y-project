import { IDataIngredients } from "../types";

export const setLocalStorage = (key: string, value: IDataIngredients[]) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Не удалось загрузить состояние", err);
    return undefined;
  }
};
