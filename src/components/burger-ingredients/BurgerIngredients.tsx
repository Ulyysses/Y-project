import { useState, useRef, useMemo } from "react";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredient from "../burger-ingredient";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import Loading from "../loading";

import css from "./index.module.scss";
import { useAppSelector } from "../../hooks";
import { IDataIngredients } from "../../types";

interface IBurgerIngredients {
  isLoading: boolean;
}

const BurgerIngredients = ({ isLoading }: IBurgerIngredients) => {
  const [current, setCurrent] = useState("bun");

  const dataIngredients = useAppSelector(
    (state) => state.ingredients.dataIngredients
  );

  const [modalData, setModalData] = useState<IDataIngredients | null>(null);

  const modalActive = Boolean(modalData);

  const onClose = () => {
    setModalData(null);
    window.history.replaceState(null, "", "/");
  };

  const cartIngredients = useAppSelector(
    (state) => state.ingredients.cartIngredients
  );

  const duplicates = useMemo(
    () =>
      cartIngredients.reduce(
        (
          acc: {
            [key: string]: number;
          },
          cartIngredient
        ) => {
          const id = cartIngredient._id;
          acc[id] = (acc[id] || 0) + 1;
          return acc;
        },
        {}
      ),
    [cartIngredients]
  );

  const buns = useRef<HTMLDivElement | null>(null);
  const sauces = useRef<HTMLDivElement | null>(null);
  const main = useRef<HTMLDivElement | null>(null);
  const scrollContainer = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollContainerPosition =
      scrollContainer.current &&
      scrollContainer.current.getBoundingClientRect().top;
    const firstHeaderPosition =
      buns.current && buns.current.getBoundingClientRect().top;
    const secondHeaderPosition =
      sauces.current && sauces.current.getBoundingClientRect().top;
    const thirdHeaderPosition =
      main.current && main.current.getBoundingClientRect().top;

    const firstDiff =
      scrollContainerPosition &&
      firstHeaderPosition &&
      Math.abs(scrollContainerPosition - firstHeaderPosition);
    const secondDiff =
      scrollContainerPosition &&
      secondHeaderPosition &&
      Math.abs(scrollContainerPosition - secondHeaderPosition);
    const thirdDiff =
      scrollContainerPosition &&
      thirdHeaderPosition &&
      Math.abs(scrollContainerPosition - thirdHeaderPosition);

    if (firstDiff && secondDiff && thirdDiff) {
      if (firstDiff < secondDiff && firstDiff < thirdDiff) {
        setCurrent("bun");
      } else if (secondDiff < firstDiff && secondDiff < thirdDiff) {
        setCurrent("sauce");
      } else {
        setCurrent("main");
      }
    }
  };

  const handleClick = (id: string) => {
    window.history.replaceState(null, "", `/ingredients/${id}`);
  };

  return (
    <section className={css.ingredients_wrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={css.tabs}>
            <a href="#bun_id">
              <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
                Булки
              </Tab>
            </a>
            <a href="#sauce_id">
              <Tab
                value="sauce"
                active={current === "sauce"}
                onClick={setCurrent}
              >
                Соусы
              </Tab>
            </a>
            <a href="#main_id">
              <Tab
                value="main"
                active={current === "main"}
                onClick={setCurrent}
              >
                Начинки
              </Tab>
            </a>
          </div>
          <div
            className={css.burger_ingredients}
            ref={scrollContainer}
            onScroll={handleScroll}
          >
            <div className={css.ingredients_section} ref={buns}>
              <h2
                className={classNames(
                  "text text_type_main-medium",
                  css.section_header
                )}
                id="bun_id"
              >
                Булки
              </h2>
              <ul className={css.list}>
                {dataIngredients.map((ingredient: IDataIngredients) => {
                  if (ingredient.type === "bun") {
                    return (
                      <li key={ingredient._id}>
                        <button
                          onClick={() => {
                            setModalData(ingredient);
                            handleClick(ingredient._id);
                          }}
                          className={css.list_button}
                        >
                          <BurgerIngredient
                            name={ingredient.name}
                            image={ingredient.image}
                            price={ingredient.price}
                            id={ingredient._id}
                            count={duplicates[ingredient._id]}
                          />
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={css.ingredients_section} ref={sauces}>
              <h2
                className={classNames(
                  "text text_type_main-medium",
                  css.section_header
                )}
                id="sauce_id"
              >
                Соусы
              </h2>
              <ul className={css.list}>
                {dataIngredients.map((ingredient) => {
                  if (ingredient.type === "sauce") {
                    return (
                      <li key={ingredient._id}>
                        <button
                          onClick={() => {
                            setModalData(ingredient);
                            handleClick(ingredient._id);
                          }}
                          className={css.list_button}
                        >
                          <BurgerIngredient
                            name={ingredient.name}
                            image={ingredient.image}
                            price={ingredient.price}
                            id={ingredient._id}
                            count={duplicates[ingredient._id]}
                          />
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={css.ingredients_section} ref={main}>
              <h2
                className={classNames(
                  "text text_type_main-medium",
                  css.section_header
                )}
                id="main_id"
              >
                Начинки
              </h2>
              <ul className={css.list}>
                {dataIngredients.map((ingredient) => {
                  if (ingredient.type === "main") {
                    return (
                      <li key={ingredient._id}>
                        <button
                          onClick={() => {
                            setModalData(ingredient);
                            handleClick(ingredient._id);
                          }}
                          className={css.list_button}
                        >
                          <BurgerIngredient
                            name={ingredient.name}
                            image={ingredient.image}
                            price={ingredient.price}
                            id={ingredient._id}
                            count={duplicates[ingredient._id]}
                          />
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
          {modalActive && (
            <Modal active={modalActive} onClose={onClose}>
              <IngredientDetails data={modalData} />
            </Modal>
          )}
        </>
      )}
    </section>
  );
};

export default BurgerIngredients;
