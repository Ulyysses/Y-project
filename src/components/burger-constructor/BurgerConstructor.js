import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useContext } from "react";
import OrderDetails from "../order-details";
import Modal from "../modal";
import css from "./index.module.scss";
import PropTypes from "prop-types";
import IngredientsContext from "../context/ingredients-context";
import NumberContext from "../context/number-context";

const BurgerConstructor = () => {
  const [modalActive, setModalActive] = useState(false);
  const [number, setNumber] = useState(null);
  const ingredients = useContext(IngredientsContext);

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
        setNumber(data.order.number);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
              setModalActive(true);
              makeOrder();
            }}
            htmlType="submit"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <NumberContext.Provider value={number}>
          <OrderDetails />
        </NumberContext.Provider>
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
  ).isRequired,
};

export default BurgerConstructor;
