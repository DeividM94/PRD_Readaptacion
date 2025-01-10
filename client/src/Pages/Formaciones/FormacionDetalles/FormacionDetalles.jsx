import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import "./formacionDetalles.scss";

export const FormacionDetalles = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();


  const formaciones = [
    {
      id: 1,
      title: "Aranda del Duero",
      description: "La formación se llevará a cabo durante dos días completos, sábado y domingo.",
      date: "15 de febrero de 2025",
      format: "Online",
      price: 150,
      image: "https://via.placeholder.com/800x600",
    },
    {
      id: 2,
      title: "Entrenamiento Personal Presencial",
      description: "Sesión intensiva de entrenamiento personal para lograr tus objetivos físicos.",
      date: "22 de marzo de 2025",
      format: "Presencial",
      price: 200,
      image: "https://via.placeholder.com/800x600",
    },
  ];

  // Buscar la formación correspondiente al ID
  const formacion = formaciones.find((f) => f.id === parseInt(id));

  if (!formacion) {
    return <div>Formación no encontrada</div>;
  }

  return (
    <div className="formacion-detalles-section">
      <Container fluid className="formacion-detalles-container my-5 px-4 px-lg-5">
        <Row>
          <Col lg={12} className="mb-4">
            <Card className="formacion-details-card">
              <Row className="g-0">
                {/* Imagen a la izquierda */}
                <Col md={4}>
                  <div className="formacion-details-image">
                    <Card.Img
                      className="formacion-details-image"
                      src={formacion.image}
                      alt={formacion.title}
                    />
                  </div>
                </Col>

                {/* Contenido a la derecha */}
                <Col md={8}>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="mb-3">{formacion.title}</Card.Title>
                      <Card.Text className="text-muted">{formacion.description}</Card.Text>
                      <div className="formacion-details-info">
                        <ul>
                          <li><strong>Fecha:</strong> {formacion.date}</li>
                          <li><strong>Formato:</strong> {formacion.format}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="text-primary mb-0">{formacion.price} €</h3>
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/pago/${formacion.id}`)}
                      >
                        Añadir al carrito
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Button variant="secondary" onClick={() => navigate("/formaciones")}>
          Volver a las formaciones
        </Button>
      </Container>
    </div>
  );
};