import { useState } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { clearModal, setModalOrderNumber } from "../../services/modal";
import OrderDetails from "../order-details";
import Modal from "../modal";

import css from "./index.module.scss";

const BurgerConstructor = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ingredients = useSelector((state) => state.ingredients.cartIngredients);

  const dispatch = useDispatch();

  const modalOrderNumber = useSelector((state) => state.modal.modalOrderNumber);

  const modalActive = Boolean(modalOrderNumber);

  const onClose = () => {
    dispatch(clearModal());
  };

  const countPrice = (cartItems) => {
    return cartItems.reduce(
      (acc, current) =>
        (acc += current.type === "bun" ? current.price * 2 : current.price),
      0
    );
  };

  const makeOrder = () => {
    const api = "https://norma.nomoreparties.space/api/orders";
    const ingredientsArray = ingredients.map((element) => element._id);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsArray,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setModalOrderNumber(data.order.number));
        console.log("Success:", data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <section className={css.constructor}>
      <div className={css.list}>
        <div className={css.list_start_end}>
          {ingredients.map((element, index) => {
            if (element.type === "bun")
              return (
                <div key={element._id} className={css.list_item}>
                  <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </div>
              );
            return null;
          })}
        </div>
        <div className={css.list_item_mid}>
          {ingredients.map((element) => {
            if (element.type !== "bun")
              return (
                <div key={element._id} className={css.list_item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </div>
              );
            return null;
          })}
        </div>
        <div className={css.list_start_end}>
          {ingredients.map((element, index) => {
            if (element.type === "bun")
              return (
                <div key={element._id} className={css.list_item}>
                  <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </div>
              );
            return null;
          })}
        </div>
        <div className={css.make_order}>
          <div className={css.final_price}>
            <p className="text text_type_digits-medium">
              {countPrice(ingredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              makeOrder();
              setIsLoading(true);
            }}
            htmlType="submit"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal active={modalActive} onClose={onClose}>
        <OrderDetails hasError={hasError} isLoading={isLoading} />
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
};

export default BurgerConstructor;
