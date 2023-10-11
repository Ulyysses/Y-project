import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from "../modal-overlay";

import css from "./index.module.scss";
import { ReactNode } from "react";

interface IModalProps {
  active: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ active, onClose, children }: IModalProps) => {
  if (!active) {
    return null;
  }

  return (
    <ModalOverlay active={active} onClose={onClose}>
      <div className={css.modal_content}>
        <button className={css.close_button} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;
