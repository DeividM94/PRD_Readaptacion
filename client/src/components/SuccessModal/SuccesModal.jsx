import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, handleClose, navigateToCart }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>¡Añadido al carrito!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>La formación ha sido añadida correctamente al carrito.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Seguir explorando
        </Button>
        <Button variant="primary" onClick={navigateToCart}>
          Ir al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;