import {
  Logo,
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./index.module.scss";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav className={css.container}>
        <ul className={css.nav_ul}>
          <li>
            <a href="#" className={`${css.nav_link} pl-5 pr-5 mr-2`}>
              <BurgerIcon type="secondary" />
              <span
                className={`${css.nav_link_text} text text_type_main-default ml-2`}
              >
                Конструктор
              </span>
            </a>
          </li>
          <li>
            <a href="#" className={css.nav_link}>
              <ListIcon type="secondary" />
              <span
                className={`${css.nav_link_text} text text_type_main-default ml-2`}
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
          <li className={css.nav_profileIcon}>
            <a href="#" className={`${css.nav_link} mr-5`}>
              <ProfileIcon type="secondary" />
              <span
                className={`${css.nav_link_text} text text_type_main-default ml-2`}
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
