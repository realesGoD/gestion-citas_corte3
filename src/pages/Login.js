import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa'; // Importar un ícono de react-icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <Card className="shadow-lg rounded" style={{ padding: '30px', borderRadius: '15px' }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontWeight: '600' }}>
                <FaSignInAlt className="me-2" style={{ fontSize: '1.8rem' }} />
                Iniciar sesión
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderRadius: '10px',
                      padding: '10px',
                      border: '1px solid #ddd',
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Introduce tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      borderRadius: '10px',
                      padding: '10px',
                      border: '1px solid #ddd',
                    }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" style={{ borderRadius: '10px' }}>
                  Iniciar sesión
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <p style={{ fontSize: '0.9rem' }}>
                  ¿No tienes cuenta? <a href="/register" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Regístrate</a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
