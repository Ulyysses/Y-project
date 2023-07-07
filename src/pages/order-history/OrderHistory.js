import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import css from "./index.module.scss";
import { useAuth } from "../auth";
import { removeAll } from "../../services/ingredients";
import Order from "../order/Order";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { signOut } = useAuth();

  const logout = (e) => {
    e.preventDefault();
    signOut();
    dispatch(removeAll());
  };

  return (
    <div className={css.order_history}>
      <div className={css.profile_nav}>
        <ul className={css.profile_list}>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => {
                return classNames(
                  "text text_type_main-medium",
                  css.profile_link,
                  isActive ? css.active : ""
                );
              }}
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile/orders"
              className={({ isActive }) => {
                return classNames(
                  "text text_type_main-medium",
                  css.profile_link,
                  isActive ? css.active : ""
                );
              }}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) => {
                return classNames(
                  "text text_type_main-medium",
                  css.profile_link,
                  isActive ? css.active : ""
                );
              }}
              onClick={logout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={classNames(
            "text text_type_main-default",
            css.profile_text
          )}
        >
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={css.order_list}>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
        <NavLink to="/profile/orders:id" className={css.order_item}>
          <Order />
        </NavLink>
      </div>
    </div>
  );
};

export default OrderHistory;
