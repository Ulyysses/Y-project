import { useSelector } from "react-redux";
import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { countPrice, formateDate } from "../../utils/helpers";
import { defineStatus } from "../../utils/helpers";

import css from "./index.module.scss";

const OrderFull = ({ orderFull }) => {
  const dataIngredients = useSelector(
    (state) => state.ingredients.dataIngredients
  );

  if (!orderFull) {
    return null;
  }

  const cartItems = dataIngredients.filter((ingredient) =>
    orderFull.ingredients.includes(ingredient._id)
  );

  const filteredIngredients = orderFull.ingredients?.filter(Boolean);

  const normalizedOrder = filteredIngredients.reduce((acc, ingredientId) => {
    const ingredientFull = dataIngredients.find(
      (item) => item._id === ingredientId
    );

    acc[ingredientId] = {
      ...ingredientFull,
      quantity: acc[ingredientId] ? acc[ingredientId].quantity + 1 : 1,
    };

    return acc;
  }, {});

  return (
    <div className={css.order_container}>
      <p
        className={classNames(
          "text text_type_digits-default",
          css.order_number
        )}
      >
        #{orderFull.number}
      </p>
      <h3 className={classNames("text text_type_main-medium", css.order_name)}>
        {orderFull.name}
      </h3>
      <p
        className={classNames("text text_type_main-default", css.order_status)}
      >
        {defineStatus(orderFull.status)}
      </p>
      <p className={classNames("text text_type_main-medium", css.order_comp)}>
        Состав:
      </p>
      <ul className={css.order_ingredients}>
        {Object.keys(normalizedOrder).map((ingredientId) => {
          return (
            <li
              className={css.ingredient_container}
              key={normalizedOrder[ingredientId]._id}
            >
              <div className={css.ingredient_photo_container}>
                <img
                  className={css.ingredient_photo}
                  src={normalizedOrder[ingredientId].image}
                  width="112"
                  height="56"
                  alt={normalizedOrder[ingredientId].name}
                ></img>
              </div>
              <p
                className={classNames(
                  "text text_type_main-default",
                  css.ingredient_name
                )}
              >
                {normalizedOrder[ingredientId].name}
              </p>
              <div className={css.ingredient_price}>
                <p
                  className={classNames(
                    "text text_type_digits-default",
                    css.ingredient_price_numbers
                  )}
                >
                  {normalizedOrder[ingredientId].quantity} x{" "}
                  {normalizedOrder[ingredientId].price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={css.order_total}>
        <p
          className={classNames(
            "text text_type_main-default text_color_inactive",
            css.order_time
          )}
        >
          {formateDate(orderFull.createdAt)}
        </p>
        <div className={css.order_price}>
          <p className="text text_type_digits-default">
            {countPrice(cartItems)}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFull;
