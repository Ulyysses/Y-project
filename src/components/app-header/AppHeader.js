import {
  Logo,
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav className={classNames("container", css.header_nav)}>
        <ul className={css.nav_ul}>
          <li className={css.li_first}>
            <a href="#" className={css.nav_link}>
              <BurgerIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Конструктор
              </span>
            </a>
          </li>
          <li>
            <a href="#" className={css.nav_link}>
              <ListIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Лента заказов
              </span>
            </a>
          </li>
          <li className={css.nav_logo}>
            <a href="#">
              <Logo />
            </a>
          </li>
          <li className={css.nav_profile_icon}>
            <a href="#" className={css.nav_link}>
              <ProfileIcon type="secondary" />
              <span
                className={classNames(
                  "text text_type_main-default ml-2",
                  css.nav_link_text
                )}
              >
                Личный кабинет
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
