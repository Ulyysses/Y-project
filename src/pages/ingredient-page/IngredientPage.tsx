import { useParams } from "react-router-dom";

import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

import css from "./index.module.scss";
import { useAppSelector } from "../../hooks";

const IngredientPage = () => {
  const { id } = useParams();

  const dataIngredients = useAppSelector(
    (state) => state.ingredients.dataIngredients
  );

  const currentIngredient =
    dataIngredients.find((ingredient) => {
      return ingredient._id === id;
    }) ?? null;

  return (
    <div className={css.ingredient_wrapper}>
      <IngredientDetails data={currentIngredient} />
    </div>
  );
};

export default IngredientPage;
