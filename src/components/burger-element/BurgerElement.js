import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient } from "../../services/ingredients";
import { moveIngredient } from "../../services/ingredients";

import css from "./index.module.scss";

const BurgerElement = ({ element, index, lock, type }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, dragOrder] = useDrag({
    type: "ingredientOrder",
    item: { index },
  });

  const [, dropOrder] = useDrop({
    accept: "ingredientOrder",
    drop(item) {
      console.log(item.index);
      const indexDrag = item.index;
      const indexDrop = index;
      dispatch(moveIngredient([indexDrag, indexDrop]));
    },
  });

  const deleteIngredient = () => {
    dispatch(removeIngredient(index));
  };

  if (!type) {
    dropOrder(ref);
    dragOrder(ref);
  }

  return (
    <div key={element._id + index} className={css.list_item} ref={ref}>
      {type ? null : <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={lock}
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={deleteIngredient}
      />
    </div>
  );
};

export default BurgerElement;
