import classNames from "classnames";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./index.module.scss";

interface IBurgerIngredientProps {
  name: string;
  price: number;
  image: string;
  id: string;
  count: number;
}

const BurgerIngredient = ({
  name,
  price,
  image,
  id,
  count,
}: IBurgerIngredientProps) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id },
  });

  return (
    <div className={css.item} ref={dragRef} data-test-id="drag">
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

export default BurgerIngredient;
