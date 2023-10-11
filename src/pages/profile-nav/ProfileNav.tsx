import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useDispatch } from "react-redux";

import { useAuth } from "../auth";
import { removeAll } from "../../services/ingredients";

import css from "./index.module.scss";
import { MouseEvent } from "react";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const { signOut } = useAuth();

  const logout = (event: MouseEvent) => {
    event.preventDefault();
    signOut();
    dispatch(removeAll());
  };

  return (
    <ul className={css.profile_nav}>
      <li>
        <NavLink
          end
          to="/profile"
          className={({ isActive }) => {
            return classNames(
              "text text_type_main-medium",
              css.profile_link,
              isActive && css.active
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
              isActive && css.active
            );
          }}
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={classNames("text text_type_main-medium", css.profile_link)}
          onClick={logout}
        >
          Выход
        </NavLink>
      </li>
    </ul>
  );
};

export default ProfileNav;
