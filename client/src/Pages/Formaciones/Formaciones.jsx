import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./formaciones.scss";
import { useNavigate } from "react-router-dom";
import fetchData from "./../../helper/axiosHelper";

export const Formaciones = () => {
  const [formaciones, setFormaciones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para gestionar la carga

  const navigate = useNavigate();

  useEffect(() => {
    const cargarFormaciones = async () => {
      try {
        const data = await fetchData("formaciones", "GET");
        setFormaciones(data);
        setLoading(false); // Se establece como false cuando los datos están cargados
      } catch (err) {
        setError(
          "No se pudieron cargar las formaciones. Inténtalo nuevamente."
        );
        setLoading(false); // También se establece como false si ocurre un error
        console.log(err);
      }
    };

    cargarFormaciones();
  }, []);

  const handleReservationClick = (id) => {
    navigate(`/formaciones/${id}`);
  };

  return (
    <div className="formacion-section">
      <Container fluid className="formacion-container my-5 px-4 px-lg-5">
        <h1 className="text-center text-white mb-4">Nuestras Formaciones</h1>

        {/* Mostrar error si no se pueden cargar las formaciones */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Mostrar spinner mientras se están cargando los datos */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {formaciones.length > 0 ? (
              formaciones.map((formacion) => (
                <Col key={formacion.id} lg={12} className="mb-4">
                  <Card className="formacion-card h-100">
                    <Row className="g-0">
                      {/* Imagen a la izquierda */}
                      <Col md={4}>
                        <Card.Img
                          className="h-100"
                          src={formacion.image}
                          alt={formacion.titulo}
                          style={{ objectFit: "cover" }}
                        />
                      </Col>

                      {/* Contenido a la derecha */}
                      <Col md={8}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <div>
                            <Card.Title className="mb-3">
                              {formacion.titulo}
                            </Card.Title>
                            <Card.Text className="text-muted">
                              {formacion.descripcion}
                            </Card.Text>
                            <ul className="list-unstyled mb-4">
                              <li>
                                <strong>Fecha:</strong> {formacion.fecha}
                              </li>
                              <li>
                                <strong>Dirección:</strong> {formacion.direccion}
                              </li>
                            </ul>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h3 className="text-primary mb-0">
                              {formacion.price} €
                            </h3>
                            <Button
                              variant="primary"
                              onClick={() => handleReservationClick(formacion.id)}
                            >
                              Reservar ahora
                            </Button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <div className="alert alert-info">
                  No hay formaciones disponibles en este momento.
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};
