import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { removeIngredient } from "../../services/ingredients";
import { moveIngredient } from "../../services/ingredients";

import css from "./index.module.scss";

interface IBurgerElementProps {
  element: {
    image: string;
    price: number;
    _id: string;
    name: string;
  };
  index: number;
  lock?: boolean;
  type?: "top" | "bottom";
}

const BurgerElement = ({ element, index, lock, type }: IBurgerElementProps) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [, dragOrder] = useDrag({
    type: "ingredientOrder",
    item: { index },
  });

  const [{ isHover }, dropOrder] = useDrop({
    accept: "ingredientOrder",
    drop(item: { index: string }) {
      const indexDrag = item.index;
      const indexDrop = index;
      dispatch(moveIngredient([indexDrag, indexDrop]));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const deleteIngredient = () => {
    dispatch(removeIngredient(index));
  };

  if (!type) {
    dropOrder(ref);
    dragOrder(ref);
  }

  return (
    <div
      key={element._id + index}
      className={classNames(css.list_item, isHover && css.drop_hover)}
      ref={ref}
    >
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
