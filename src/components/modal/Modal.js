import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import css from "./index.module.scss";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import PropTypes from "prop-types";

const Modal = ({ active, setActive, children }) => {
  if (!active) {
    return null;
  }

  return (
    <ModalOverlay open={active} onClose={() => setActive(false)}>
      <div className={css.modal_content} onClick={(e) => e.stopPropagation()}>
        <button className={css.close_button} onClick={() => setActive(false)}>
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
