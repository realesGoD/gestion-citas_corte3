// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; // Hook de autenticación
import { auth } from '../firebase'; // Configuración de Firebase
import { signOut } from 'firebase/auth';
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { FaUserAlt, FaSignInAlt, FaSignOutAlt, FaRegUser } from 'react-icons/fa'; // Iconos para más interacción visual

function Navbar() {
  const [user] = useAuthState(auth); // Estado de usuario, se actualiza automáticamente al cambiar sesión

  const handleLogout = () => {
    signOut(auth); // Cerrar sesión con Firebase Auth
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <span className="navbar-brand-text">Centro Médico</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-item">
              <FaUserAlt className="me-2" />
              Inicio
            </Nav.Link>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item">
                  <FaSignInAlt className="me-2" />
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item">
                  <FaRegUser className="me-2" />
                  Registrarse
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/dashboard" className="nav-item">
                  <FaUserAlt className="me-2" />
                  Dashboard
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="nav-item">
                  <FaSignOutAlt className="me-2" />
                  Cerrar Sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
