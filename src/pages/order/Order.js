import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./index.module.scss";

const Order = () => {
  return (
    <div className="order_container">
      <div className={css.upper_wrapper}>
        <p className="text text_type_digits-default">#45678</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <h2 className="text text_type_main-medium">
        Death Star Starship Main бургер
      </h2>
      <div className={css.lower_wrapper}>
        <div className={css.icons_wrapper}>
          <div className={css.icon}></div>
          <div className={css.icon}></div>
          <div className={css.icon}></div>
          <div className={css.icon}></div>
        </div>
        <div className={css.price_wrapper}>
          <p className="text text_type_digits-default">280</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Order;
