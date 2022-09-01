import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";

const App = () => {
  return (
    <>
      <AppHeader />
      <main className="container">
        <BurgerIngredients />
      </main>
    </>
  );
};

export default App;
