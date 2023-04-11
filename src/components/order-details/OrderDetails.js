import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";

import orderDone from "../../images/order-done.png";
import Loading from "../loading";
import Error from "../error";

import css from "./index.module.scss";

const OrderDetails = ({ hasError, isLoading }) => {
  const orderNumber = useSelector((state) => state.modal.modalOrderNumber);

  if (isLoading) {
    return (
      <div className={css.order_fetch}>
        <Loading />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={css.order_fetch}>
        <Error />
      </div>
    );
  }

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

OrderDetails.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
export default OrderDetails;
