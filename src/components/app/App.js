import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import Error from "../error";
import Loading from "../loading";

import { setIngredients } from "../../services/ingredients";

const App = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

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
      });
  }, []);

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
            <DndProvider backend={HTML5Backend}>
              <div className="small_container">
                <BurgerIngredients isLoading={isLoading} />
                <BurgerConstructor isLoading={isLoading} />
              </div>
            </DndProvider>
          </main>
        </>
      )}
    </>
  );
};

export default App;
