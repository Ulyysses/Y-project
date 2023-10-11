import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import BurgerIngredients from "../../components/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor";

const MainPage = () => {
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <DndProvider backend={HTML5Backend}>
        <div className="small_container">
          <BurgerIngredients isLoading={false} />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </>
  );
};

export default MainPage;
