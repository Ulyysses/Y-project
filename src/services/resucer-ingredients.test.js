import ingredientsSlice, {
  setIngredients,
  addIngredient,
  moveIngredient,
  removeIngredient,
  removeAll,
} from "./ingredients";
import { getLocalStorage } from "../utils/localStorage";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsSlice(undefined, {})).toEqual({
      dataIngredients: null,
      cartIngredients: getLocalStorage("cartIngredients") ?? [],
    });
  });

  it("should handle setIngredients action", () => {
    expect(
      ingredientsSlice(
        {
          dataIngredients: null,
        },
        setIngredients("someIngredient")
      )
    ).toEqual({
      dataIngredients: "someIngredient",
    });
  });

  it("should handle addIngredient action", () => {
    expect(
      ingredientsSlice(
        {
          cartIngredients: ["ingredient1", "ingredient2"],
        },
        addIngredient("ingredient3")
      )
    ).toEqual({
      cartIngredients: ["ingredient1", "ingredient2", "ingredient3"],
    });
  });

  it("should handle moveIngredient action", () => {
    expect(
      ingredientsSlice(
        {
          cartIngredients: ["ingredient1", "ingredient2", "ingredient3"],
        },
        moveIngredient([0, 2])
      )
    ).toEqual({
      cartIngredients: ["ingredient3", "ingredient2", "ingredient1"],
    });
  });

  it("should handle removeIngredient action", () => {
    expect(
      ingredientsSlice(
        {
          cartIngredients: ["ingredient1", "ingredient2", "ingredient3"],
        },
        removeIngredient(1)
      )
    ).toEqual({
      cartIngredients: ["ingredient1", "ingredient3"],
    });
  });

  it("should handle removeAll action", () => {
    expect(
      ingredientsSlice(
        {
          cartIngredients: ["ingredient1", "ingredient2", "ingredient3"],
        },
        removeAll([])
      )
    ).toEqual({
      cartIngredients: [],
    });
  });
});
