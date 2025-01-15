import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./carrito.scss";

export const Carrito = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  // Calculamos el precio total del carrito
  const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.plazas, 0);

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Usamos la función removeFromCart del contexto
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    // Limitar la cantidad de plazas a un máximo de 5
    if (newQuantity > 5) {
      newQuantity = 5;
    }
    updateQuantity(id, newQuantity); // Usamos updateQuantity del contexto
  };

  

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12}>
          <h1>Carrito de Compras</h1>
          {cart.length === 0 ? (
            <>
              <p>No hay productos en el carrito.</p>
              <Button variant="secondary" onClick={() => navigate("/formaciones")}>
                Volver a las formaciones
              </Button>
            </>
          ) : (
            <div>
              {cart.map((item) => (
                <Card key={item.id} className="mb-3 carrito-card">
                  <Card.Body>
                    <Row className="align-items-center"> {/* Alineación vertical */}
                      <Col xs={12} md={8}>
                        <h5>{item.titulo}</h5>
                        <p>{item.descripcion}</p>
                      </Col>
                      <Col xs={6} md={2}>
                        <Form.Control
                          type="number"
                          value={item.plazas}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          min="1"
                          max="5"
                        />
                      </Col>
                      <Col xs={6} md={2} className="d-flex justify-content-center">
                        <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>

      {/* Mostrar precio total y botones debajo */}
      {cart.length > 0 && (
        <Row className="my-4 cart-summary">
          <Col xs={6} className="d-flex justify-content-start align-items-center">
            <Button
              variant="secondary"
              onClick={() => navigate("/formaciones")}
              className="my-2"
            >
              Volver a las formaciones
            </Button>
          </Col>
          <Col xs={6} className="d-flex justify-content-end align-items-center">
            <h4>Total: €{totalPrice.toFixed(2)}</h4>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              className="my-2"
            >
              Ir a pagar
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};
