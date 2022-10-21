import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className="container">
        <h1 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h1>
        <div className="small_container">
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
};

export default App;
