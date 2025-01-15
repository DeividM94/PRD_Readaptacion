import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Spinner, Badge } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import fetchData from "./../../../helper/axiosHelper";
import { CartContext } from "../../../context/CartContext";
import "./formacionDetalles.scss";

export const FormacionDetalles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); 
  const [formacion, setFormacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [plazas, setPlazas] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`formaciones/${id}`, "GET");
        setFormacion(data);
      } catch (err) {
        setError("No se pudo cargar la información. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchFormacion();
  }, [id]);

  const increasePlazas = () => plazas < 5 && setPlazas(plazas + 1);
  const decreasePlazas = () => plazas > 1 && setPlazas(plazas - 1);

  const handleAddToCart = () => {
    addToCart(formacion, plazas); 
    setMessage("Formación añadida al carrito.");
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Cargando detalles de la formación...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <Button variant="secondary" onClick={() => navigate("/formaciones")}>
          Volver a las formaciones
        </Button>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row>
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

          <h2 className="text-primary">{formacion.precio} €</h2>

          <div className="d-flex flex-column gap-3">
            <Button variant="primary" onClick={handleAddToCart}>
              Añadir al carrito
            </Button>
            <Button variant="secondary" onClick={() => navigate("/carrito")}>
              Ver carrito
            </Button>
          </div>
        </Col>
      </Row>
      {message && <p className="text-success mt-3">{message}</p>}
      <Button variant="secondary" className="mt-4" onClick={() => navigate("/formaciones")}>
        Volver a las formaciones
      </Button>
    </Container>
  );
};
