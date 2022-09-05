import {
  ConstructorElement,
  Button,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";
import data from "../../utils/data";

const BurgerConstructor = () => {
  return (
    <section className={css.constrctor}>
      <div className={css.list}>
        <div className={css.list_start_end}>
          {data.map((element, index) => {
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
          })}
        </div>
        <div className={css.list_item_mid}>
          {data.map((element) => {
            if (element.type !== "bun")
              return (
                <div key={element._id} className={classNames(css.list_item)}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </div>
              );
          })}
        </div>
        <div className={css.list_start_end}>
          {data.map((element, index) => {
            if (element.type === "bun" && index === data.length - 1)
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
          })}
        </div>
        <div className={css.make_order}>
          <div className={css.final_price}>
            <p className="text text_type_digits-medium">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BurgerConstructor;