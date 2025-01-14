import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./formacionDetalles.scss";
import fetchData from "./../../../helper/axiosHelper";

export const FormacionDetalles = () => {
  const { id } = useParams(); // ID obtenido de los parámetros de la URL
  const navigate = useNavigate();
  const [formacion, setFormacion] = useState(null); // Estado para almacenar los datos de la formación
  const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [plazas, setPlazas] = useState(1); // Estado para la cantidad de plazas seleccionadas
  const [message, setMessage] = useState(""); // Mensaje de éxito o error

  // Fetch para obtener la formación del backend
  useEffect(() => {
    const fetchFormacion = async () => {
      try {
        setLoading(true);
        const data = await fetchData(`formaciones/${id}`, "GET");
        setFormacion(data);
      } catch (err) {
        setError("No se pudo cargar la información. Inténtalo nuevamente.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFormacion();
  }, [id]);

  // Función para aumentar el número de plazas
  const increasePlazas = () => {
    if (plazas < 5) {
      setPlazas(plazas + 1);
    }
  };

  // Función para disminuir el número de plazas
  const decreasePlazas = () => {
    if (plazas > 1) {
      setPlazas(plazas - 1);
    }
  };

  // Función para añadir la formación al carrito en localStorage
  const handleAddToCart = () => {
    if (plazas < 1 || plazas > 5) {
      setMessage("Selecciona un número de plazas entre 1 y 5.");
      return;
    }

    // Obtener el carrito actual del localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Comprobar si la formación ya está en el carrito
    const existingItemIndex = cart.findIndex(
      (item) => item.trainingId === formacion.id
    );

    if (existingItemIndex !== -1) {
      // Si ya existe, actualizamos las plazas
      cart[existingItemIndex].plazas += parseInt(plazas);
    } else {
      // Si no existe, agregamos una nueva entrada al carrito
      cart.push({
        trainingId: formacion.id,
        titulo: formacion.titulo,
        price: formacion.price,
        plazas: parseInt(plazas),
        image: formacion.image,
      });
    }

    // Actualizar el carrito en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage("Formación añadida al carrito con éxito.");
  };

  // Manejo de estados
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

  if (!formacion) {
    return (
      <div className="text-center mt-5">
        <p>Formación no encontrada</p>
        <Button variant="secondary" onClick={() => navigate("/formaciones")}>
          Volver a las formaciones
        </Button>
      </div>
    );
  }

  return (
    <div className="formacion-detalles-section">
      <Container
        fluid
        className="formacion-detalles-container my-5 px-4 px-lg-5"
      >
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
                      alt={formacion.titulo}
                    />
                  </div>
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
                      <div className="formacion-details-info">
                        <ul>
                          <li>
                            <strong>Fecha:</strong> {formacion.fecha}
                          </li>
                          <li>
                            <strong>Dirección:</strong> {formacion.direccion}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Botones de + y - para las plazas */}
                    <div className="formacion-details-plazas">
                      <Button
                        variant="outline-secondary"
                        onClick={decreasePlazas}
                      >
                        -
                      </Button>
                      <span className="mx-3">{plazas}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={increasePlazas}
                      >
                        +
                      </Button>
                    </div>

                    {/* Mensaje de éxito o error */}
                    {message && <p>{message}</p>}

                    {/* Precio y botón de añadir al carrito */}
                    <div className="d-flex justify-content-between align-items-center">
                      <h3 className="text-primary mb-0">{formacion.price} €</h3>
                      <Button variant="primary" onClick={handleAddToCart}>
                        Añadir al carrito
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate("/carrito")}
                      >
                        Ir al carrito
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
