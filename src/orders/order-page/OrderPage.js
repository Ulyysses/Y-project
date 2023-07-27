import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OrderFull from "../order-full/OrderFull";
import { allConnectionStart } from "../../services/ordersAll";

const OrderPage = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.allOrders.orders);

  useEffect(() => {
    dispatch({ type: allConnectionStart.type });
  }, []);

  const { id } = useParams();

  const order = orders?.find((order) => {
    return order._id === id;
  });

  return (
    <div>
      <OrderFull orderFull={order} />
    </div>
  );
};

export default OrderPage;