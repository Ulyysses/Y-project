import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";
import React from "react";
import data from "../../utils/data";
import BurgerIngredient from "../burger-ingredient";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <main className="container">
      <div className={css.ingredients_wrapper}>
        <h1
          className={classNames("text text_type_main-medium", css.main_header)}
        >
          Соберите бургер
        </h1>
        <div className={css.tabs}>
          <Tab value="bread" active={current === "bread"} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="fill" active={current === "fill"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <section className={css.section_bread}>
          <h2
            className={classNames(
              "text text_type_main-medium",
              css.section_header
            )}
          >
            Булки
          </h2>
          <ul className={css.ul_item}>
            <li>
              <BurgerIngredient />
            </li>
            <li>
              <BurgerIngredient />
            </li>
          </ul>
        </section>
        <section className={css.section_sauce}>
          <h2
            className={classNames(
              "text text_type_main-medium",
              css.section_header
            )}
          >
            Соусы
          </h2>
          <ul className={css.ul_item}>
            <li>
              <BurgerIngredient />
            </li>
            <li>
              <BurgerIngredient />
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default BurgerIngredients;
