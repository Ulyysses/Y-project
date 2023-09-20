import modalSlice, {
  setModalIngredient,
  setModalOrderNumber,
  clearModal,
} from "./modal";

describe("modal reducer", () => {
  it("should return the initial state", () => {
    expect(modalSlice(undefined, {})).toEqual({
      modalIngredient: null,
      modalOrderNumber: null,
    });
  });

  it("should handle setModalIngredient action", () => {
    expect(
      modalSlice(
        {
          modalIngredient: null,
        },
        setModalIngredient("someIngredient")
      )
    ).toEqual({
      modalIngredient: "someIngredient",
    });
  });

  it("should handle setModalOrderNumber action", () => {
    expect(
      modalSlice(
        {
          modalOrderNumber: null,
        },
        setModalOrderNumber("someOrderNumber")
      )
    ).toEqual({
      modalOrderNumber: "someOrderNumber",
    });
  });

  it("should handle clearModal action", () => {
    expect(
      modalSlice(
        {
          modalIngredient: "someIngredient",
          modalOrderNumber: "someOrderNumber",
        },
        clearModal()
      )
    ).toEqual({
      modalIngredient: null,
      modalOrderNumber: null,
    });
  });
});
