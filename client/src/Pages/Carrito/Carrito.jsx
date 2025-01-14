import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export const Carrito = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Estado para almacenar el carrito

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (trainingId) => {
    const updatedCart = cart.filter((item) => item.trainingId !== trainingId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Función para ir a la página de pago
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="carrito-section">
      <Container fluid className="carrito-container my-5 px-4 px-lg-5">
        <Row>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.map((item) => (
              <Col lg={12} className="mb-4" key={item.trainingId}>
                <Card className="carrito-card">
                  <Row className="g-0">
                    <Col md={4}>
                      <Card.Img src={item.image} alt={item.titulo} />
                    </Col>
                    <Col md={8}>
                      <Card.Body>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Text>{item.plazas} plazas</Card.Text>
                        <Card.Text>{item.price} €</Card.Text>
                        <Button variant="danger" onClick={() => handleRemoveItem(item.trainingId)}>
                          Eliminar
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          )}
        </Row>
        {cart.length > 0 && (
          <Button variant="primary" onClick={handleCheckout}>
            Proceder al pago
          </Button>
        )}
      </Container>
    </div>
  );
};
