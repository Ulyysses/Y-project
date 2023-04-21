import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import classNames from "classnames";
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

  const [{ isHover }, dropOrder] = useDrop({
    accept: "ingredientOrder",
    drop(item) {
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

BurgerElement.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  image: PropTypes.string,
};

export default BurgerElement;
