import type { ReactNode } from "react";
import {
  Overlay,
  ModalBox,
  ModalTitle,
  ModalDescription,
  ModalActions,
  ModalContent,
} from "./Modal.styles";

interface ModalProps {
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
}

export const Modal = ({
  title,
  description,
  children,
  actions,
  onClose,
}: ModalProps) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {description && <ModalDescription>{description}</ModalDescription>}
        {children && <ModalContent>{children}</ModalContent>}
        {actions && <ModalActions>{actions}</ModalActions>}
      </ModalBox>
    </Overlay>
  );
};
