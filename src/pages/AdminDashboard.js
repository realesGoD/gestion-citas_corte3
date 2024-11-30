import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { db } from '../firebase'; // Asegúrate de importar la configuración de Firebase
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [newEspecialidad, setNewEspecialidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [newHorario, setNewHorario] = useState('');
  const [medico, setMedico] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      const especialidadesSnapshot = await getDocs(collection(db, 'especialidades'));
      setEspecialidades(especialidadesSnapshot.docs.map(doc => doc.data()));
    };

    const fetchHorarios = async () => {
      const horariosSnapshot = await getDocs(collection(db, 'horarios'));
      setHorarios(horariosSnapshot.docs.map(doc => doc.data()));
    };

    fetchEspecialidades();
    fetchHorarios();
  }, []);

  // Función para agregar una nueva especialidad
  const handleAddEspecialidad = async () => {
    try {
      const docRef = await addDoc(collection(db, 'especialidades'), {
        nombre: newEspecialidad,
        descripcion: descripcion
      });
      setEspecialidades([...especialidades, { nombre: newEspecialidad, descripcion }]);
      setNewEspecialidad('');
      setDescripcion('');
    } catch (error) {
      setError('Error al agregar la especialidad');
    }
  };

  // Función para agregar un nuevo horario
  const handleAddHorario = async () => {
    try {
      const docRef = await addDoc(collection(db, 'horarios'), {
        fecha: newHorario,
        medico: medico,
        disponibilidad: true // Se establece como disponible por defecto
      });
      setHorarios([...horarios, { fecha: newHorario, medico, disponibilidad: true }]);
      setNewHorario('');
      setMedico('');
    } catch (error) {
      setError('Error al agregar el horario');
    }
  };

  return (
    <Container>
      <h2>Panel de Administración</h2>
      {error && <p className="text-danger">{error}</p>}

      <Row className="mt-4">
        <Col md={6}>
          <h3>Agregar Especialidad</h3>
          <Form>
            <Form.Group controlId="formEspecialidad">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la especialidad"
                value={newEspecialidad}
                onChange={(e) => setNewEspecialidad(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDescripcion">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción de la especialidad"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddEspecialidad}>
              Agregar Especialidad
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h3>Agregar Horario</h3>
          <Form>
            <Form.Group controlId="formHorario">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                value={newHorario}
                onChange={(e) => setNewHorario(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formMedico">
              <Form.Label>Médico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del médico"
                value={medico}
                onChange={(e) => setMedico(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddHorario}>
              Agregar Horario
            </Button>
          </Form>
        </Col>
      </Row>

      <h3 className="mt-4">Especialidades Disponibles</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Especialidad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((especialidad, index) => (
            <tr key={index}>
              <td>{especialidad.nombre}</td>
              <td>{especialidad.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-4">Horarios Disponibles</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Médico</th>
            <th>Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td>{new Date(horario.fecha).toLocaleString()}</td>
              <td>{horario.medico}</td>
              <td>{horario.disponibilidad ? 'Disponible' : 'No disponible'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
