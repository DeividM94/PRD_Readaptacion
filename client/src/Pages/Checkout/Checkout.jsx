import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchData from "../../helper/axiosHelper";
import './checkout.scss';

export const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    tallas: [], // Cambiado a un array para manejar múltiples tallas
  });


  // Cargar los datos del carrito desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  const handleTallaChange = (index, value) => {
    const nuevasTallas = [...orderData.tallas];
    nuevasTallas[index] = value;
    setOrderData({ ...orderData, tallas: nuevasTallas });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formacionId = cartItems.length > 0 ? cartItems[0].formacion_id : null;

    if (!formacionId) {
      alert("El carrito está vacío. Añade una formación antes de continuar.");
      setLoading(false);
      return;
    }

    if (orderData.tallas.length !== totalPlazas) {
      alert("Por favor, selecciona una talla para cada plaza reservada.");
      setLoading(false);
      return;
    }

    const dataToSend = {
      ...orderData,
      tallas: orderData.tallas.join(","), // Convertir tallas a string
      formacionId,
      plazas: cartItems.reduce((acc, item) => acc + item.plazas, 0), // Enviar el número total de plazas
    };

    try {
      const data = await fetchData("reservar", "POST", dataToSend);

      if (data.sessionUrl) {
        // Redirigir al usuario al checkout de Stripe
        window.location.href = data.sessionUrl;
      } else {
        alert("Hubo un error: " + data.mensaje);
      }
    } catch (error) {
      console.error("Error al procesar el pedido:", error);
      alert("Ocurrió un error. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.precio * item.plazas, 0);

  // Calcular el total de plazas para las tallas
  const totalPlazas = cartItems.reduce((acc, item) => acc + item.plazas, 0);

  return (
    <div className="ppal p-3">
      <Container className="bg-white p-5 rounded-3">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Procesando tu pedido...</p>
          </div>
        ) : (
          <Row>
            <Col md={7}>
              <h2>Detalles de Facturación</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu nombre"
                    name="nombre"
                    value={orderData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formApellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tus apellidos"
                    name="apellidos"
                    value={orderData.apellidos}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formCorreo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    name="correo"
                    value={orderData.correo}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu teléfono"
                    name="telefono"
                    value={orderData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <h4 className="mt-4">Selecciona las tallas de camisetas:</h4>
                {Array.from({ length: totalPlazas }).map((_, index) => (
                  <Form.Group controlId={`formTalla${index}`} key={index}>
                    <Form.Label>Talla para la plaza {index + 1}</Form.Label>
                    <Form.Select
                      value={orderData.tallas[index] || ""}
                      onChange={(e) => handleTallaChange(index, e.target.value)}
                      required
                    >
                      <option value="">Selecciona una talla</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </Form.Select>
                  </Form.Group>
                ))}

                <Button variant="primary" type="submit" className="mt-4">
                  Realizar pedido
                </Button>
              </Form>
            </Col>

            <Col md={5}>
              <h2 className="pt-3">Resumen del Pedido</h2>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <div className="d-flex justify-content-between">
                          <span>
                            {item.titulo} x{item.plazas}
                          </span>
                          <span>{item.precio} €</span>
                        </div>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item className="d-flex justify-content-between">
                      <strong>Total:</strong>
                      <strong>{totalAmount} €</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};
