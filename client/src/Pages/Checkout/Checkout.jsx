import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import fetchData from "../../helper/axiosHelper";
import './checkout.scss'

export const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderData, setOrderData] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    telefono: "",
    talla: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Obtén el ID de la formación desde el carrito de compras, ajusta según tu estructura de datos
    const formacionId = cartItems.length > 0 ? cartItems[0].id : null; // Asegúrate de que 'cartItems' tenga los datos correctos
    console.log(formacionId); // Revisa que el ID de la formación esté correcto
    
    try {
      // Usando fetchData para hacer la solicitud POST
      const data = await fetchData('reservar', 'POST', { ...orderData, formacionId });
  
      if (data.mensaje) {
        console.log(data.mensaje); // Reserva realizada correctamente
        // Aquí puedes redirigir a Stripe para el pago si es necesario
  
      } else {
        console.log('Error:', data.mensaje); // Maneja el error
      }
  
    } catch (error) {
      console.error('Error:', error); // Muestra cualquier error que pueda ocurrir
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.precio * item.plazas, 0);

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

              <Form.Group controlId="formTalla">
                <Form.Label>Talla</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Introduce tu talla"
                  name="talla"
                  value={orderData.talla}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

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
                        <span>{item.titulo} x{item.plazas}</span>
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
