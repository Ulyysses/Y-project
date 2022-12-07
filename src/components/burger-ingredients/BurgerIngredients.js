import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";
import css from "./index.module.scss";
import { useState } from "react";
import BurgerIngredient from "../burger-ingredient";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import Loading from "../loading";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients, loading }) => {
  const [current, setCurrent] = useState("bun");

  const [modalActive, setModalActive] = useState(false);

  const [modalData, setModalData] = useState();

  const ingredientModal = (ingredient) => {
    setModalActive(true);
    setModalData(ingredient);
  };

  return (
    <section className={css.ingredients_wrapper}>
      {loading ? (
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
          <div className={css.burger_ingredients}>
            <div className={css.ingredients_section}>
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
                {ingredients.map((ingredient) => {
                  if (ingredient.type === "bun") {
                    return (
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          ingredientModal(ingredient);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                        />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={css.ingredients_section}>
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
                {ingredients.map((ingredient) => {
                  if (ingredient.type === "sauce") {
                    return (
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          ingredientModal(ingredient);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                        />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className={css.ingredients_section}>
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
                {ingredients.map((ingredient) => {
                  if (ingredient.type === "main") {
                    return (
                      <li
                        key={ingredient._id}
                        onClick={() => {
                          ingredientModal(ingredient);
                        }}
                      >
                        <BurgerIngredient
                          name={ingredient.name}
                          image={ingredient.image}
                          price={ingredient.price}
                        />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
          {modalData && (
            <Modal active={modalActive} setActive={setModalActive}>
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
  ).isRequired,
  loading: PropTypes.bool,
};

export default BurgerIngredients;
