import OrderList from "../order-list/OrderList";
import OrderReadiness from "../order-readiness/OrderReadiness";
import Loading from "../../components/loading";

const FeedPage = () => {
  const orders = useSelector((state) => state.allOrders.orders);

  if (!orders) {
    return <Loading style={{ height: "80vh" }} />;
  }

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className="small_container">
        <OrderList />
        <OrderReadiness />
      </div>
    </>
  );
};

export default FeedPage;
