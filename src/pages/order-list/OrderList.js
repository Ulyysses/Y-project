import css from "./index.module.scss";
import Order from "../order/Order";

const OrderList = () => {
  return (
    <div className={css.list_wrapper}>
      <a className={css.item_wrapper} href="/feed:id">
        <Order />
      </a>
      <a className={css.item_wrapper} href="/feed:id">
        <Order />
      </a>
      <a className={css.item_wrapper} href="/feed:id">
        <Order />
      </a>
      <a className={css.item_wrapper} href="/feed:id">
        <Order />
      </a>
      <a className={css.item_wrapper} href="/feed:id">
        <Order />
      </a>
    </div>
  );
};

export default OrderList;
