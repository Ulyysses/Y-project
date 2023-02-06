import { useState, useEffect } from "react";
import IngredientsContext from "../context/ingredients-context/IngredientsContext";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import Error from "../error";
import Loading from "../loading";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const [hasError, setHasError] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const api = "https://norma.nomoreparties.space/api/ingredients";
    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        setIngredients(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <Loading style={{ height: "100vh" }} />;
  }

  return (
    <>
      {hasError ? (
        <Error />
      ) : (
        <>
          <AppHeader />
          <main className="container">
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <div className="small_container">
              <BurgerIngredients
                ingredients={ingredients}
                loading={isLoading}
              />
              <IngredientsContext.Provider
                value={[
                  {
                    _id: "60d3b41abdacab0026a733cb",
                    name: "Биокотлета из марсианской Магнолии",
                    type: "main",
                    proteins: 420,
                    fat: 142,
                    carbohydrates: 242,
                    calories: 4242,
                    price: 424,
                    image: "https://code.s3.yandex.net/react/code/meat-01.png",
                    image_mobile:
                      "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                    image_large:
                      "https://code.s3.yandex.net/react/code/meat-01-large.png",
                    __v: 0,
                  },
                  {
                    _id: "60d3b41abdacab0026a733c6",
                    name: "Краторная булка N-200i",
                    type: "bun",
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_mobile:
                      "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    image_large:
                      "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    __v: 0,
                  },

                  {
                    _id: "60d3b41abdacab0026a733cf",
                    name: "Соус с шипами Антарианского плоскоходца",
                    type: "sauce",
                    proteins: 101,
                    fat: 99,
                    carbohydrates: 100,
                    calories: 100,
                    price: 88,
                    image: "https://code.s3.yandex.net/react/code/sauce-01.png",
                    image_mobile:
                      "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
                    image_large:
                      "https://code.s3.yandex.net/react/code/sauce-01-large.png",
                    __v: 0,
                  },
                  {
                    _id: "60d3b41abdacab0026a733d4",
                    name: "Сыр с астероидной плесенью",
                    type: "main",
                    proteins: 84,
                    fat: 48,
                    carbohydrates: 420,
                    calories: 3377,
                    price: 4142,
                    image: "https://code.s3.yandex.net/react/code/cheese.png",
                    image_mobile:
                      "https://code.s3.yandex.net/react/code/cheese-mobile.png",
                    image_large:
                      "https://code.s3.yandex.net/react/code/cheese-large.png",
                    __v: 0,
                  },
                ]}
              >
                <BurgerConstructor isLoading={isLoading} />
              </IngredientsContext.Provider>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default App;
