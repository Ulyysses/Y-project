import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";
import React from "react";
import data from "../../utils/data";
import BurgerIngredient from "../burger-ingredient";

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");
  return (
    <section className={css.ingredients_wrapper}>
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
      <div className={css.burger_ingredients}>
        <div className={css.ingredients_section}>
          <h2
            className={classNames(
              "text text_type_main-medium",
              css.section_header
            )}
          >
            Булки
          </h2>
          <ul className={css.ul_item}>
            {data.map((ingredient) => {
              if (ingredient.type === "bun") {
                return (
                  <li key={ingredient._id}>
                    <BurgerIngredient
                      name={ingredient.name}
                      image={ingredient.image}
                      price={ingredient.price}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={css.ingredients_section}>
          <h2
            className={classNames(
              "text text_type_main-medium",
              css.section_header
            )}
          >
            Соусы
          </h2>
          <ul className={css.ul_item}>
            {data.map((ingredient) => {
              if (ingredient.type === "sauce") {
                return (
                  <li key={ingredient._id}>
                    <BurgerIngredient
                      name={ingredient.name}
                      image={ingredient.image}
                      price={ingredient.price}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className={css.ingredients_section}>
          <h2
            className={classNames(
              "text text_type_main-medium",
              css.section_header
            )}
          >
            Начинки
          </h2>
          <ul className={css.ul_item}>
            {data.map((ingredient) => {
              if (ingredient.type === "main") {
                return (
                  <li key={ingredient._id}>
                    <BurgerIngredient
                      name={ingredient.name}
                      image={ingredient.image}
                      price={ingredient.price}
                    />
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BurgerIngredients;
