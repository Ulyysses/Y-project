import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import OrderFull from "../order-full/OrderFull";
import { wsConnectionStart } from "../../services/orders";

const RecentOrder = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch({ type: wsConnectionStart.type });
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

export default RecentOrder;
