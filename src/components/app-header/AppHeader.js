import {
  Logo,
  ListIcon,
  ProfileIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./index.module.css";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav className={css.header_nav}>
        <ul className={css.nav_ul}>
          <div className={css.two_li}>
            <li>
              <a href="#" className={css.nav_link}>
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
          </div>
          <li className={css.nav_logo}>
            <a href="#">
              <Logo />
            </a>
          </li>
          <li>
            <a href="#" className={css.nav_link}>
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
