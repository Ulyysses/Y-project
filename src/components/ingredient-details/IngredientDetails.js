import classNames from "classnames";
import PropTypes from "prop-types";

import css from "./index.module.scss";

import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const data = useSelector((state) => state.modal.modalIngredient);
  return (
    <div className={css.ingredients_details}>
      <h3
        className={classNames(
          "text text_type_main-large",
          css.title_ingredient
        )}
      >
        Детали ингредиента
      </h3>
      <img
        src={data.image_large}
        alt={data.name}
        className={css.img_ingredient}
        width={480}
        height={240}
      ></img>
      <p
        className={classNames(
          "text text_type_main-medium",
          css.name_ingredient
        )}
      >
        {data.name}
      </p>
      <ul className={css.list_info_ingredients}>
        <li className={css.item_info_ingredient}>
          <p
            className={classNames(
              "text text_type_main-default text_color_inactive",
              css.item_name_info_ingredient
            )}
          >
            Калории,ккал
          </p>
          <p
            className={classNames(
              "text text_type_digits-default text_color_inactive"
            )}
          >
            {data.calories}
          </p>
        </li>
        <li className={css.item_info_ingredient}>
          <p
            className={classNames(
              "text text_type_main-default text_color_inactive",
              css.item_name_info_ingredient
            )}
          >
            Белки, г
          </p>
          <p
            className={classNames(
              "text text_type_digits-default text_color_inactive"
            )}
          >
            {data.proteins}
          </p>
        </li>
        <li className={css.item_info_ingredient}>
          <p
            className={classNames(
              "text text_type_main-default text_color_inactive",
              css.item_name_info_ingredient
            )}
          >
            Жиры, г
          </p>
          <p
            className={classNames(
              "text text_type_digits-default text_color_inactive"
            )}
          >
            {data.fat}
          </p>
        </li>
        <li className={css.item_info_ingredient}>
          <p
            className={classNames(
              "text text_type_main-default text_color_inactive",
              css.item_name_info_ingredient
            )}
          >
            Углеводы, г
          </p>
          <p
            className={classNames(
              "text text_type_digits-default text_color_inactive"
            )}
          >
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
};

export default IngredientDetails;
