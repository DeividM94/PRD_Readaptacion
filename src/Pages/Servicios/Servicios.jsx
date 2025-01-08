import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Servicios.scss";
import { useNavigate } from "react-router-dom";
import { useWhatsApp } from "../../hooks/useWhatsApp";

export const Servicios = () => {

  const navigate = useNavigate()
  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <div className="servicios">
      <h1 className="pt-5">Sesiones Presenciales</h1>
      <Container>
        <Row className="justify-content-center py-3">
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Valoración Inicial</Card.Title>
                <Card.Text>
                  Una sesión para evaluar tu estado físico inicial y planificar
                  objetivos personalizados.
                </Card.Text>
                <h4>€50</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Sesión Adaptación</Card.Title>
                <Card.Text>
                  Adaptamos los entrenamientos a tus necesidades específicas con
                  un enfoque progresivo.
                </Card.Text>
                <h4>€60</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center py-3">
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Bono 4 Sesiones</Card.Title>
                <Card.Text>
                  Plan de entrenamiento personalizado de 4 sesiones
                  individuales.
                </Card.Text>
                <h4>€200</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Bono 8 Sesiones</Card.Title>
                <Card.Text>
                  Plan de entrenamiento personalizado de 8 sesiones
                  individuales.
                </Card.Text>
                <h4>€380</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Bono 10 Sesiones</Card.Title>
                <Card.Text>
                  Plan de entrenamiento personalizado de 10 sesiones
                  individuales.
                </Card.Text>
                <h4>€450</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center pb-5">
          <button className="boton" onClick={()=>navigate('/pide-cita')}>
            Pide Cita
          </button>
        </div>

        <h1 className="pt-5">Sesiones Online</h1>
        <Row className="justify-content-center pb-3">
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Precio Mensual</Card.Title>
                <Card.Text>
                  Acceso a un plan de entrenamiento mensual con soporte
                  personalizado.
                </Card.Text>
                <h4>€100</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="card">
              <Card.Body>
                <Card.Title>Precio Trimestral</Card.Title>
                <Card.Text>
                  Acceso a un plan de entrenamiento trimestral con soporte
                  personalizado.
                </Card.Text>
                <h4>€270</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center pb-5">
          <button className="boton" onClick={handleWhatsAppClick}>
            Escríbeme
          </button>
        </div>
      </Container>
    </div>
  );
};
