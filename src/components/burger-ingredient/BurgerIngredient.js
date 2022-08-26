import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";

const BurgerIngredient = () => {
  const data = {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  };

  return (
    <div className={css.item}>
      <img src={data.image} className={css.img} width="240" height="120"></img>
      <div className={css.price}>
        <p className={classNames("text text_type_main-default", css.p_price)}>
          {data.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={classNames("text text_type_main-small", css.title)}>
        {data.name}
      </p>
    </div>
  );
};

export default BurgerIngredient;
