import OrderList from "../order-list/OrderList";
import OrderReadiness from "../order-readiness/OrderReadiness";

const FeedPage = () => {
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
