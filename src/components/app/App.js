import { useState, useEffect } from "react";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import Error from "../error";
import Loading from "../loading";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState(false);

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
        setError(true);
        setIsLoading(false);
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error ? (
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
              <BurgerConstructor
                ingredients={ingredients}
                loading={isLoading}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default App;
