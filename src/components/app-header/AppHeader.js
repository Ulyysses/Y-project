import React from "react";
import classNames from "classnames";
import { Link, NavLink } from "react-router-dom";
import {
  Logo,
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import css from "./index.module.scss";

const AppHeader = () => {
  return (
    <header className={css.main_header}>
      <nav className={classNames("container", css.header_nav)}>
        <ul className={css.nav_list}>
          <li className={css.list_item}>
            <NavLink
              to="/"
              className={({ isActive }) => {
                return classNames(css.nav_link, isActive ? css.active : "");
              }}
            >
              <BurgerIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Конструктор
              </span>
            </NavLink>
          </li>
          <li className={css.list_item}>
            <NavLink
              to="#"
              className={({ isActive }) => {
                return classNames(css.nav_link, isActive ? css.active : "");
              }}
            >
              <ListIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Лента заказов
              </span>
            </NavLink>
          </li>
          <li className={classNames(css.list_item, css.nav_logo)}>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li className={css.list_item}>
            <NavLink
              to="/profile"
              className={({ isActive }) => {
                return classNames(css.nav_link, isActive ? css.active : "");
              }}
            >
              <ProfileIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Личный кабинет
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
