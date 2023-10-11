import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import OrderFull from "../order-full/OrderFull";
import { allConnectionStart } from "../../services/ordersAll";
import { useAppSelector } from "../../hooks";

const OrderPage = () => {
  const dispatch = useDispatch();

  const orders = useAppSelector((state) => state.allOrders.orders);

  useEffect(() => {
    dispatch(allConnectionStart());
  }, []);

  const { id } = useParams();

  const order =
    orders?.find((order) => {
      return order._id === id;
    }) ?? null;

  return <OrderFull orderFull={order} />;
};

export default OrderPage;
