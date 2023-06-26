import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredient from "../burger-ingredient";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import Loading from "../loading";

import css from "./index.module.scss";

const BurgerIngredients = ({ isLoading }) => {
  const [current, setCurrent] = useState("bun");

  const dataIngredients = useSelector(
    (state) => state.ingredients.dataIngredients
  );

  const [modalData, setModalData] = useState(null);

  const modalActive = Boolean(modalData);

  const onClose = () => {
    setModalData(null);
    window.history.replaceState(null, "", "/");
  };

  const cartIngredients = useSelector(
    (state) => state.ingredients.cartIngredients
  );

  const duplicates = useMemo(
    () =>
      cartIngredients.reduce((acc, cartIngredient) => {
        const id = cartIngredient._id;
        acc[id] = (acc[id] || 0) + 1;
        return acc;
      }, {}),
    [cartIngredients]
  );

  const buns = useRef(null);
  const sauces = useRef(null);
  const main = useRef(null);
  const scrollContainer = useRef(null);

  const handleScroll = () => {
    const scrollContainerPosition =
      scrollContainer.current.getBoundingClientRect().top;
    const firstHeaderPosition = buns.current.getBoundingClientRect().top;
    const secondHeaderPosition = sauces.current.getBoundingClientRect().top;
    const thirdHeaderPosition = main.current.getBoundingClientRect().top;

    const firstDiff = Math.abs(scrollContainerPosition - firstHeaderPosition);
    const secondDiff = Math.abs(scrollContainerPosition - secondHeaderPosition);
    const thirdDiff = Math.abs(scrollContainerPosition - thirdHeaderPosition);

    if (firstDiff < secondDiff && firstDiff < thirdDiff) {
      setCurrent("bun");
    } else if (secondDiff < firstDiff && secondDiff < thirdDiff) {
      setCurrent("sauce");
    } else {
      setCurrent("main");
    }
  };

  const handleClick = (id) => {
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
                {dataIngredients.map((ingredient) => {
                  if (ingredient.type === "bun") {
                    return (
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          setModalData(ingredient);
                          handleClick(ingredient._id);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                          id={ingredient._id}
                          count={duplicates[ingredient._id]}
                        />
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
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          setModalData(ingredient);
                          handleClick(ingredient._id);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                          id={ingredient._id}
                          count={duplicates[ingredient._id]}
                        />
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
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          setModalData(ingredient);
                          handleClick(ingredient._id);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                          id={ingredient._id}
                          count={duplicates[ingredient._id]}
                        />
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  ),
  isLoading: PropTypes.bool,
};

export default BurgerIngredients;
