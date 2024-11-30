import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [descripcion, setDescripcion] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [fecha, setFecha] = useState('');
  const [medico, setMedico] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      const citasSnapshot = await getDocs(collection(db, 'citas'));
      setCitas(citasSnapshot.docs.map(doc => doc.data()));
    };

    fetchCitas();
  }, []);

  const handleAddCita = async () => {
    try {
      const docRef = await addDoc(collection(db, 'citas'), {
        descripcion,
        especialidad,
        fecha,
        medico,
        usuarioID: "usuarioID123" // Usa el ID del usuario
      });
      setCitas([...citas, { descripcion, especialidad, fecha, medico }]);
      setDescripcion('');
      setEspecialidad('');
      setFecha('');
      setMedico('');
    } catch (error) {
      setError('Error al agregar la cita');
    }
  };

  return (
    <Container>
      <h2>Gestionar Citas Médicas</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEspecialidad">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formFecha">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMedico">
              <Form.Label>Médico</Form.Label>
              <Form.Control
                type="text"
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddCita}>
              Agregar Cita
            </Button>
          </Form>
        </Col>
      </Row>

      <h3 className="mt-4">Citas Programadas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Médico</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita, index) => (
            <tr key={index}>
              <td>{cita.descripcion}</td>
              <td>{cita.especialidad}</td>
              <td>{new Date(cita.fecha).toLocaleString()}</td>
              <td>{cita.medico}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Citas;
