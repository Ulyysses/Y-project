import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import OrderDetails from "../order-details/OrderDetails";
import Modal from "../modal/Modal";
import css from "./index.module.scss";
import PropTypes from "prop-types";

const BurgerConstructor = ({ ingredients }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <section className={css.constructor}>
      <div className={css.list}>
        <div className={css.list_start_end}>
          {ingredients.map((element, index) => {
            if (element.type === "bun" && index === 0)
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
            if (element.type === "bun" && index === 0)
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
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setModalActive(true);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <OrderDetails />
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
