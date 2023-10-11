import classNames from "classnames";

import css from "./index.module.scss";
import { IDataIngredients } from "../../types";

interface IIngredientDetails {
  data: IDataIngredients | null;
}

const IngredientDetails = ({ data }: IIngredientDetails) => {
  if (!data) {
    return null;
  }
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

export default IngredientDetails;
