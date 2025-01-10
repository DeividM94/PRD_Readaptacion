import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBarApp.scss";

export const NavBarApp = () => {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid className="mx-5">
        <Link to="/">
          {" "}
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
