import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import Order from "../order/Order";
import Modal from "../../components/modal/Modal";
import OrderFull from "../order-full/OrderFull";

import css from "./index.module.scss";

const OrderList = () => {
  const orders = useSelector((state) => state.allOrders.orders);

  const [modalData, setModalData] = useState(null);

  const onClose = useCallback(() => {
    setModalData(null);
    window.history.replaceState(null, "", "/feed");
  }, []);

  const modalActive = Boolean(modalData);

  const handleClick = (id) => {
    window.history.replaceState(null, "", `/feed/${id}`);
  };

  return (
    <div className={css.order_list}>
      <ul className={css.list_wrapper}>
        {orders &&
          orders.map((order) => {
            return (
              <li key={order._id}>
                <button
                  className={css.item_wrapper}
                  onClick={() => {
                    setModalData(order);
                    handleClick(order._id);
                  }}
                >
                  <Order
                    number={order.number}
                    date={order.createdAt}
                    ingredients={order.ingredients.filter(Boolean)}
                    name={order.name}
                  />
                </button>
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

export default OrderList;
