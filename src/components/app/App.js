import { useState, useEffect } from "react";

import IngredientsContext from "../context/ingredients-context/IngredientsContext";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import Error from "../error";
import Loading from "../loading";

import { useSelector, useDispatch } from "react-redux";
import { setIngredients } from "../../services/ingredients";

const App = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ingredients = useSelector((state) => state.ingredients.dataIngredients);
  const dispatch = useDispatch();

  const chosenIngredients = useSelector(
    (state) => state.ingredients.cartIngredients
  );

  useEffect(() => {
    const api = "https://norma.nomoreparties.space/api/ingredients";
    fetch(api)
      .then((res) => res.json())
      .then((result) => {
        dispatch(setIngredients(result.data));
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(true);
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  console.log(ingredients);

  if (isLoading) {
    return <Loading style={{ height: "100vh" }} />;
  }

  return (
    <>
      {hasError ? (
        <Error style={{ height: "100vh" }} />
      ) : (
        <>
          <AppHeader />
          <main className="container">
            <h1 className="text text_type_main-large mt-10 mb-5">
              Соберите бургер
            </h1>
            <div className="small_container">
              <BurgerIngredients isLoading={isLoading} />
              <IngredientsContext.Provider value={chosenIngredients}>
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
