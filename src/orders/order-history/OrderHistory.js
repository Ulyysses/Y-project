import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import Order from "../order/Order";
import OrderFull from "../order-full/OrderFull";
import Modal from "../../components/modal/Modal";
import ProfileNav from "../../pages/profile-nav/ProfileNav";
import { wsConnectionStart } from "../../services/orders";
import Loading from "../../components/loading";
import { defineStatus } from "../../utils/helpers";

import css from "./index.module.scss";

const OrderHistory = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(wsConnectionStart());
  }, []);

  const [modalData, setModalData] = useState(null);

  const onClose = useCallback(() => {
    setModalData(null);
    window.history.replaceState(null, "", "/profile/orders");
  }, []);

  const modalActive = Boolean(modalData);

  const handleClick = (id) => {
    window.history.replaceState(null, "", `/profile/orders/${id}`);
  };

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
      {!orders ? (
        <div className={css.order_loading}>
          <Loading />
        </div>
      ) : (
        <ul className={css.order_list}>
          {orders
            ?.slice()
            .reverse()
            .map((order) => {
              return (
                <li key={order._id}>
                  <button
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
                      status={defineStatus(order.status)}
                    />
                  </button>
                </li>
              );
            })}
        </ul>
      )}

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
