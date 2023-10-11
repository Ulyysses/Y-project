import { useEffect, ReactNode, MouseEvent, ReactPortal } from "react";
import { createPortal } from "react-dom";

import css from "./index.module.scss";

interface IModalOverlayProps {
  active: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay = ({
  children,
  active,
  onClose,
}: IModalOverlayProps): ReactPortal | null => {
  const modalRootElement = document.querySelector("#modal");

  const closeOverlay = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;

    if (
      typeof target.className === "string" &&
      target.className.includes(css.overlay)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
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

  if (!modalRootElement) {
    return null;
  }

  return createPortal(
    <div className={css.overlay} onClick={closeOverlay}>
      {children}
    </div>,
    modalRootElement
  );
};

export default ModalOverlay;
