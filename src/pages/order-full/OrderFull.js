import classNames from "classnames";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./index.module.scss";

const OrderFull = () => {
  return (
    <div className={css.order_container}>
      <p
        className={classNames(
          "text text_type_digits-default",
          css.order_number
        )}
      >
        #45678
      </p>
      <h3 className={classNames("text text_type_main-medium", css.order_name)}>
        Black hole острый бургер
      </h3>
      <p
        className={classNames("text text_type_main-default", css.order_status)}
      >
        Выполнен
      </p>
      <p className={classNames("text text_type_main-medium", css.order_comp)}>
        Состав:
      </p>
      <div className={css.order_ingredients}>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        <div className={css.ingredient_container}>
          <div className={css.ingredient_photo}></div>
          <p
            className={classNames(
              "text text_type_main-default",
              css.ingredient_name
            )}
          >
            Флюоресцентная булка
          </p>
          <div className={css.ingredient_price}>
            <p
              className={classNames(
                "text text_type_main-default",
                css.ingredient_price
              )}
            >
              2 x 20
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
      <div className={css.order_total}>
        <p
          className={classNames(
            "text text_type_main-default text_color_inactive",
            css.order_time
          )}
        >
          Сегодня, 16:20 i-GMT+3
        </p>
        <div className={css.order_price}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderFull;
