import classNames from "classnames";
import css from "./index.module.scss";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ name, price, image }) => {
  return (
    <div className={css.item}>
      <img
        src={image}
        className={css.img}
        width="240"
        height="120"
        alt={name}
      ></img>
      <Counter count={1} size="default" />
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
