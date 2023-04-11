import classNames from "classnames";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./index.module.scss";

const BurgerIngredient = ({ name, price, image, id, count }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id },
  });

  return (
    <div className={css.item} ref={dragRef}>
      <img
        src={image}
        className={css.img}
        width="240"
        height="120"
        alt={name}
      ></img>
      {count && <Counter count={count} size="default" />}
      <div className={css.price}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames("text text_type_main-default", css.title)}>
        {name}
      </p>
    </div>
  );
};

BurgerIngredient.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default BurgerIngredient;
