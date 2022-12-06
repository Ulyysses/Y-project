import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./index.module.scss";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, open, onClose }) => {
  const modalRootElement = document.querySelector("#modal");

  useEffect(() => {
    const closeWithEscape = (e) => {
      if (e.code === "Escape") {
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

  if (open) {
    return createPortal(
      <div className={css.overlay} onClick={onClose}>
        {children}
      </div>,
      modalRootElement
    );
  }

  return null;
};

ModalOverlay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
