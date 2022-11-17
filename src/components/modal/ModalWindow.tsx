import React from 'react';
import { createPortal } from 'react-dom';
import { Modal } from 'react-bootstrap';

function ModalWindow(props: {
  children: React.ReactNode;
  modalTitle: string;
  show: boolean;
  onHide: () => void;
}) {
  const { children, modalTitle, show, onHide } = props;

  const portalContainer = document.body as HTMLElement;

  return createPortal(
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>,
    portalContainer
  );
}
export default ModalWindow;
