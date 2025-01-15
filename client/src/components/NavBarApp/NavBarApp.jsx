import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; 
import { CartContext } from "../../context/CartContext";
import "./NavBarApp.scss";

export const NavBarApp = () => {
  const { cart } = useContext(CartContext); // Obtenemos el carrito desde el contexto

  // Calculamos el total de productos en el carrito
  const totalItems = cart.reduce((acc, item) => acc + item.plazas, 0);

  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid className="mx-5">
        <Link to="/">
          <img src="/logo-nav.png" alt="logo-prd-nav" className="logo-nav" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
            <a href="/#sobre-mi">Sobre mi</a>
            <Link to="/servicios">Servicios</Link>
            <Link to="/pide-cita">Pide cita</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/formaciones">Formación</Link>
            
            {/* Icono de carrito con el contador */}
            <Link to="/carrito" className="navbar-cart-icon">
              <FaShoppingCart size={25} className="cart-icon" />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
