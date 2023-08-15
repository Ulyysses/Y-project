import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import IngredientDetails from "../../components/ingredient-details/IngredientDetails";

import css from "./index.module.scss";

const IngredientPage = () => {
  const { id } = useParams();

  const dataIngredients = useSelector(
    (state) => state.ingredients.dataIngredients
  );

  const currentIngredient = dataIngredients.find((ingredient) => {
    return ingredient._id === id;
  });

  return (
    <div className={css.ingredient_wrapper}>
      <IngredientDetails data={currentIngredient} />
    </div>
  );
};

export default IngredientPage;
