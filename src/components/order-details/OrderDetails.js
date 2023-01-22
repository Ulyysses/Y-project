import css from "./index.module.scss";
import orderDone from "../../images/order-done.png";
import classNames from "classnames";
import NumberContext from "../context/number-context";
import { useContext, useState } from "react";
import Loading from "../loading";

const OrderDetail = () => {
  const orderNumber = useContext(NumberContext);
  // const [isLoading, setIsLoading] = useState(true);

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className={css.order_details}>
      <p className={classNames("text text_type_digits-large", css.id_order)}>
        {orderNumber}
      </p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img
        src={orderDone}
        alt="символ успешно оформленного заказа"
        className={css.img_order}
      />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p
        className={classNames(
          "text text_type_main-default text_color_inactive",
          css.last_order_details
        )}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetail;
