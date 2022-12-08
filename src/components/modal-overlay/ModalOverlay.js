import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./index.module.scss";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, active, onClose }) => {
  const modalRootElement = document.querySelector("#modal");

  const closeOverlay = (event) => {
    if (
      typeof event.target.className === "string" &&
      event.target.className.includes(css.overlay)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    const closeWithEscape = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose]);

  if (!active) {
    return null;
  }

  return createPortal(
    <div className={css.overlay} onClick={closeOverlay}>
      {children}
    </div>,
    modalRootElement
  );
};

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
