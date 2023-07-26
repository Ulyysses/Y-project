import { useState, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import Order from "../order/Order";
import OrderFull from "../order-full/OrderFull";
import Modal from "../../components/modal/Modal";
import ProfileNav from "../../pages/profile-nav/ProfileNav";
import { wsConnectionStart } from "../../services/orders";

import css from "./index.module.scss";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch({ type: wsConnectionStart.type });
  }, []);

  const [modalData, setModalData] = useState(null);

  const onClose = () => {
    setModalData(null);
    window.history.replaceState(null, "", "/profile/orders");
  };

  const modalActive = Boolean(modalData);

  const handleClick = (id) => {
    window.history.replaceState(null, "", `/profile/orders/${id}`);
  };

  // const status = (status) => {
  //   return status === "done"
  //     ? "Выполнен"
  //     : status === "created"
  //     ? "Готовится"
  //     : "Отменен";
  // };

  return (
    <div className={css.order_history}>
      <div className={css.profile_nav}>
        <ProfileNav />
        <p
          className={classNames(
            "text text_type_main-default",
            css.profile_text
          )}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <ul className={css.order_list}>
        {orders
          ?.slice()
          .reverse()
          .map((order) => {
            return (
              <li
                key={order._id}
                className={css.order_item}
                onClick={() => {
                  setModalData(order);
                  handleClick(order._id);
                }}
              >
                <Order
                  number={order.number}
                  date={order.createdAt}
                  ingredients={order.ingredients}
                  name={order.name}
                  status={
                    order.status === "done"
                      ? "Выполнен"
                      : order.status === "created"
                      ? "Готовится"
                      : "Отменен"
                  }
                />
              </li>
            );
          })}
      </ul>
      {modalActive && (
        <Modal active={modalActive} onClose={onClose}>
          <div className={css.order_modal}>
            <OrderFull orderFull={modalData} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OrderHistory;
