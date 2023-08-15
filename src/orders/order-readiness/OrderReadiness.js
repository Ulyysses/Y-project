import classNames from "classnames";
import { useSelector } from "react-redux";

import css from "./index.module.scss";

const OrderReadiness = () => {
  const total = useSelector((state) => state.allOrders.total);
  const totalToday = useSelector((state) => state.allOrders.totalToday);
  const orders = useSelector((state) => state.allOrders.orders);

  if (!orders) {
    return null;
  }

  return (
    <div className={css.readiness_container}>
      <div className={css.status_wrapper}>
        <div className={css.status_ready}>
          <h3
            className={classNames(
              "text text_type_main-medium",
              css.status_text
            )}
          >
            Готовы:
          </h3>
          <ul className={css.status_numbers}>
            {orders.slice(0, 10).map((order) => {
              if (order.status === "done") {
                return (
                  <li
                    key={order._id}
                    className={classNames(
                      "text text_type_digits-default",
                      css.number_ready
                    )}
                  >
                    {order.number}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
        <div className={css.status_cook}>
          <h3
            className={classNames(
              "text text_type_main-medium",
              css.status_text
            )}
          >
            В работе:
          </h3>
          <ul className={css.status_numbers}>
            {orders.map((order) => {
              if (order.status !== "done") {
                return (
                  <li
                    key={order._id}
                    className={classNames(
                      "text text_type_digits-default",
                      css.number_cook
                    )}
                  >
                    {order.number}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
      <div className={css.done}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p
          className={classNames("text text_type_digits-large", css.number_done)}
        >
          {total}
        </p>
      </div>
      <div className={css.done}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p
          className={classNames("text text_type_digits-large", css.number_done)}
        >
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default OrderReadiness;
