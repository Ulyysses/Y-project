import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";

import css from "./index.module.scss";

const Modal = ({ active, setActive, children }) => {
  if (!active) {
    return null;
  }

  const closeModal = () => {
    setActive(false);
  };

  return (
    <ModalOverlay active={active} onClose={closeModal}>
      <div className={css.modal_content}>
        <button className={css.close_button} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
