import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import fetchData from "./../../../helper/axiosHelper";
import { CartContext } from "../../../context/CartContext";

import "./formacionDetalles.scss";
import SuccessModal from "../../../components/SuccessModal/SuccesModal";

export const FormacionDetalles = () => {
  const { formacion_id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [formacion, setFormacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plazas, setPlazas] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`formaciones/${formacion_id}`, "GET");
        setFormacion(data);
      } catch (err) {
        setError("No se pudo cargar la información. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchFormacion();
  }, [formacion_id]);

  const increasePlazas = () => plazas < 5 && setPlazas(plazas + 1);
  const decreasePlazas = () => plazas > 1 && setPlazas(plazas - 1);

  const handleAddToCart = () => {
    addToCart(formacion, plazas);
    setShowModal(true); // Mostrar el modal
  };

  const handleCloseModal = () => setShowModal(false);

  const navigateToCart = () => {
    setShowModal(false);
    navigate("/carrito");
  };

  // Solo un return con JSX renderizado según las condiciones
  return (
    <div className="formacion-detalles-section">
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Cargando detalles de la formación...</p>
        </div>
      ) : error ? (
        <div className="text-center mt-5">
          <p className="text-danger">{error}</p>
          <Button variant="secondary" onClick={() => navigate("/formaciones")}>
            Volver a las formaciones
          </Button>
        </div>
      ) : (
        <Container>
          <Row className="bg-white p-5 rounded-5">
            <Col lg={6}>
              <img
                src={formacion.image}
                alt={formacion.titulo}
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col lg={6} className="d-flex flex-column justify-content-between">
              <div>
                <h1>{formacion.titulo}</h1>
                <Badge bg="success">Nuevo</Badge>
                <p className="text-muted mt-3">{formacion.descripcion}</p>
              </div>
              <div className="my-3">
                <strong>Fecha:</strong> {formacion.fecha} <br />
                <strong>Dirección:</strong> {formacion.direccion}
              </div>
              <div className="d-flex align-items-center my-4">
                <Button variant="outline-secondary" onClick={decreasePlazas}>
                  <AiOutlineMinus />
                </Button>
                <span className="mx-3">{plazas}</span>
                <Button variant="outline-secondary" onClick={increasePlazas}>
                  <AiOutlinePlus />
                </Button>
              </div>
              <div className="d-flex align-items-center justify-content-between my-4">
                <h2 className="text-primary mb-0">{formacion.precio} €</h2>
                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={handleAddToCart}
                  >
                    Añadir al carrito
                  </Button>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={() => navigate("/carrito")}
                  >
                    Ver carrito
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Button variant="secondary" className="mt-4" onClick={() => navigate("/formaciones")}>
            Volver a las formaciones
          </Button>
        </Container>
      )}
      <SuccessModal
        show={showModal}
        handleClose={handleCloseModal}
        navigateToCart={navigateToCart}
      />
    </div>
  );
};
