import { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useSelector, useDispatch } from "react-redux";
import { clearModal, setModalOrderNumber } from "../../services/modal";
import OrderDetails from "../order-details";
import Modal from "../modal";
import BurgerElement from "../burger-element/BurgerElement";

import { addIngredient } from "../../services/ingredients";

import css from "./index.module.scss";

const BurgerConstructor = () => {
  const dataIngredients = useSelector(
    (state) => state.ingredients.dataIngredients
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      const ingredient = dataIngredients.find((el) => el._id === item.id);
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cartIngredients = useSelector(
    (state) => state.ingredients.cartIngredients
  );

  const dispatch = useDispatch();

  const modalOrderNumber = useSelector((state) => state.modal.modalOrderNumber);

  const modalActive = Boolean(modalOrderNumber);

  const onClose = () => {
    dispatch(clearModal());
  };

  const handleClickMakeOrder = () => {
    if (cartIngredients.length > 1) {
      setHasError(false);
      setIsLoading(true);
      makeOrder();
    }
    return null;
  };

  const countPrice = (cartItems) => {
    return cartItems.reduce(
      (acc, current) =>
        (acc += current.type === "bun" ? current.price * 2 : current.price),
      0
    );
  };

  const isSubmitDisabled = useMemo(
    () =>
      !(
        cartIngredients.length > 1 &&
        cartIngredients.find((el) => el.type === "bun")
      ),
    [cartIngredients]
  );

  const makeOrder = () => {
    const api = "https://norma.nomoreparties.space/api/orders";
    const ingredientsId = cartIngredients.map((element) => element._id);
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("error HTTP " + response.status);
        }
        return response.json();
      })
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
    <section
      className={classNames(css.constructor, isHover && css.drop_hover)}
      ref={dropTarget}
    >
      <div className={css.list}>
        <div className={css.list_start_end}>
          {cartIngredients.map((element, index) => {
            if (element.type === "bun")
              return (
                <BurgerElement
                  key={element._id + index}
                  element={element}
                  index={index}
                  lock={true}
                  type={"top"}
                />
              );
            return null;
          })}
        </div>
        <div className={css.list_item_mid}>
          {cartIngredients.map((element, index) => {
            if (element.type !== "bun")
              return (
                <BurgerElement
                  key={element._id + index}
                  element={element}
                  index={index}
                />
              );
            return null;
          })}
        </div>
        <div className={css.list_start_end}>
          {cartIngredients.map((element, index) => {
            if (element.type === "bun")
              return (
                <BurgerElement
                  key={element._id + index}
                  element={element}
                  index={index}
                  lock={true}
                  type={"bottom"}
                />
              );
            return null;
          })}
        </div>
        <div className={css.make_order}>
          <div className={css.final_price}>
            <p className="text text_type_digits-medium">
              {countPrice(cartIngredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={handleClickMakeOrder}
            htmlType="submit"
            disabled={makeDisabled}
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
