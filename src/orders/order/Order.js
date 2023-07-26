import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

import { countPrice, formateDate } from "../../utils/helpers";

import css from "./index.module.scss";

const Order = ({ number, date, ingredients, name, status }) => {
  const dataIngredients = useSelector(
    (state) => state.ingredients.dataIngredients
  );

  const cartItems = dataIngredients.filter((ingredient) =>
    ingredients.includes(ingredient._id)
  );

  const ingredientsFull = ingredients.map((ingredient) => {
    return dataIngredients.find((item) => item._id === ingredient);
  });

  return (
    <div className="order_container">
      <div className={css.upper_wrapper}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formateDate(date)}
        </p>
      </div>
      <h2 className="text text_type_main-medium">{name}</h2>
      <p className={classNames("text text_type_main-default", css.status)}>
        {status}
      </p>
      <div className={css.lower_wrapper}>
        <ul className={css.icons_wrapper}>
          {ingredientsFull.slice(0, 6).map((ingredient, index) => {
            const zIndex = ingredients.length - index;
            return (
              <li
                className={css.icon}
                key={ingredient._id + index}
                style={{ zIndex: zIndex }}
              >
                <img
                  src={ingredient.image}
                  className={css.img}
                  width="112"
                  height="56"
                  alt={ingredient.image}
                ></img>
              </li>
            );
          })}
        </ul>
        <div className={css.price_wrapper}>
          <p className="text text_type_digits-default">
            {countPrice(cartItems)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Order;
