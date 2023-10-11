import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import OrderFull from "../order-full/OrderFull";
import { wsConnectionStart } from "../../services/orders";
import { useAppSelector } from "../../hooks";

const RecentOrder = () => {
  const dispatch = useDispatch();

  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(wsConnectionStart());
  }, []);

  const { id } = useParams();

  const order =
    orders?.find((order) => {
      return order._id === id;
    }) ?? null;

  return <OrderFull orderFull={order} />;
};

export default RecentOrder;
