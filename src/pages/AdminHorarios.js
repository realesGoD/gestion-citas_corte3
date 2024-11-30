import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button, Form, ListGroup } from 'react-bootstrap';

const AdminHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [medicoInput, setMedicoInput] = useState('');
  const [horaInput, setHoraInput] = useState('');
  const [especialidadInput, setEspecialidadInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editMedico, setEditMedico] = useState('');
  const [editHora, setEditHora] = useState('');
  const [editEspecialidad, setEditEspecialidad] = useState('');

  useEffect(() => {
    const fetchHorarios = async () => {
      const horariosRef = collection(db, 'horarios');
      const querySnapshot = await getDocs(horariosRef);
      const horariosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHorarios(horariosList);
    };

    fetchHorarios();
  }, []);

  const handleAddHorario = async () => {
    if (medicoInput.trim() && horaInput.trim() && especialidadInput.trim()) {
      await addDoc(collection(db, 'horarios'), {
        medico: medicoInput,
        hora: horaInput,
        especialidad: especialidadInput,
      });
      setMedicoInput('');
      setHoraInput('');
      setEspecialidadInput('');
    }
  };

  const handleEditHorario = async () => {
    if (editMedico.trim() && editHora.trim() && editEspecialidad.trim()) {
      const horarioRef = doc(db, 'horarios', editId);
      await updateDoc(horarioRef, {
        medico: editMedico,
        hora: editHora,
        especialidad: editEspecialidad,
      });
      setEditId(null);
      setEditMedico('');
      setEditHora('');
      setEditEspecialidad('');
    }
  };

  const handleDeleteHorario = async (id) => {
    const horarioRef = doc(db, 'horarios', id);
    await deleteDoc(horarioRef);
  };

  return (
    <div>
      <h2>Gestionar Horarios</h2>
      
      {/* Agregar horario */}
      <Form.Control
        type="text"
        placeholder="Médico"
        value={medicoInput}
        onChange={(e) => setMedicoInput(e.target.value)}
      />
      <Form.Control
        type="time"
        placeholder="Hora"
        value={horaInput}
        onChange={(e) => setHoraInput(e.target.value)}
        className="mt-2"
      />
      <Form.Control
        type="text"
        placeholder="Especialidad"
        value={especialidadInput}
        onChange={(e) => setEspecialidadInput(e.target.value)}
        className="mt-2"
      />
      <Button onClick={handleAddHorario} variant="primary" className="mt-2">
        Agregar Horario
      </Button>

      {/* Editar horario */}
      {editId && (
        <div className="mt-3">
          <Form.Control
            type="text"
            value={editMedico}
            onChange={(e) => setEditMedico(e.target.value)}
            placeholder="Médico"
          />
          <Form.Control
            type="time"
            value={editHora}
            onChange={(e) => setEditHora(e.target.value)}
            placeholder="Hora"
            className="mt-2"
          />
          <Form.Control
            type="text"
            value={editEspecialidad}
            onChange={(e) => setEditEspecialidad(e.target.value)}
            placeholder="Especialidad"
            className="mt-2"
          />
          <Button onClick={handleEditHorario} variant="success" className="mt-2">
            Guardar Cambios
          </Button>
        </div>
      )}

      {/* Lista de horarios */}
      <ListGroup className="mt-3">
        {horarios.map(horario => (
          <ListGroup.Item key={horario.id}>
            {`${horario.medico} - ${horario.hora} - ${horario.especialidad}`}
            <Button
              variant="warning"
              size="sm"
              onClick={() => {
                setEditId(horario.id);
                setEditMedico(horario.medico);
                setEditHora(horario.hora);
                setEditEspecialidad(horario.especialidad);
              }}
              className="ml-2"
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteHorario(horario.id)}
              className="ml-2"
            >
              Eliminar
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminHorarios;
