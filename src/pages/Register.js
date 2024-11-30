import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Asegúrate de tener la configuración de Firebase importada
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Container, Card } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Iconos para los campos

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirección

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Crear usuario con correo y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirigir al Dashboard después de un registro exitoso
    } catch (error) {
      setError(error.message); // Manejar cualquier error durante el registro
    }
  };

  return (
    <Container fluid className="bg-light py-5">
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4 text-primary">Crear Cuenta</h2>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>
                <FaEnvelope className="me-2" /> Correo electrónico
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>
                <FaLock className="me-2" /> Contraseña
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-pill"
              />
            </Form.Group>

            {error && <p className="text-danger text-center">{error}</p>}

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2 rounded-pill"
            >
              Registrarse
            </Button>
          </Form>
          <div className="text-center mt-3">
            <p>
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Registro;
