import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="bg-light py-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          {/* Título Principal */}
          <h1 className="display-4 font-weight-bold text-primary mb-4">
            Bienvenido al Centro Médico Universitario
          </h1>

          {/* Descripción */}
          <p className="lead mb-5 text-muted">
            ¡Gestione fácilmente sus citas médicas en línea! Acceda a un mundo de servicios médicos sin salir de casa. Reserve, consulte y gestione todas sus citas de manera rápida y segura.
          </p>

          {/* Botón para redirigir a la página de citas */}
          <Button variant="primary" size="lg" href="/dashboard">
            ¡Comience a gestionar sus citas!
          </Button>

          {/* Card con información adicional */}
          <Row className="mt-5">
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="h5">Acceso rápido a citas</Card.Title>
                  <Card.Text>
                    Visualice todas las citas disponibles y reserve la que más le convenga. 
                  </Card.Text>
                  <Button variant="outline-primary" href="/dashboard">Ver citas disponibles</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="h5">Médicos especialistas</Card.Title>
                  <Card.Text>
                    Acceda a la lista de médicos especialistas en diferentes áreas y elija el más adecuado para su consulta.
                  </Card.Text>
                  <Button variant="outline-primary" href="/dashboard">Ver médicos</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="h5">Soporte y ayuda</Card.Title>
                  <Card.Text>
                    Si tiene alguna pregunta, nuestro equipo de soporte está disponible para ayudarle en cualquier momento.
                  </Card.Text>
                  <Button variant="outline-primary" href="/contact">Contactar soporte</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
