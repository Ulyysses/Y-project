import { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { clearModal, setModalOrderNumber } from "../../services/modal";
import OrderDetails from "../order-details";
import Modal from "../modal";
import BurgerElement from "../burger-element/BurgerElement";
import { addIngredient, removeAll } from "../../services/ingredients";
import { useAuth } from "../../pages/auth";

import css from "./index.module.scss";

const BurgerConstructor = () => {
  const { isAuthenticated } = useAuth();

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

  const navigate = useNavigate();

  const handleClickMakeOrder = () => {
    if (isAuthenticated && cartIngredients.length > 1) {
      makeOrder();
    } else {
      navigate("/login");
    }
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
    setHasError(false);
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  const clearConstructor = () => {
    dispatch(removeAll());
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
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={clearConstructor}
          >
            Очистить
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handleClickMakeOrder}
            htmlType="submit"
            disabled={isSubmitDisabled}
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
      index: PropTypes.number.isRequired,
    }).isRequired
  ),
};

export default BurgerConstructor;
