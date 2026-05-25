import type { ReactNode } from "react";
import {
  Overlay,
  ModalBox,
  ModalTitle,
  ModalDescription,
  ModalActions,
} from "./Modal.styles";

interface ModalProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ title, description, actions, onClose }: ModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
        {actions && <ModalActions>{actions}</ModalActions>}
      </ModalBox>
    </Overlay>
  );
};
