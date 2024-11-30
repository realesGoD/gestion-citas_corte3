import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button, Form, ListGroup } from 'react-bootstrap';

const AdminEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadInput, setEspecialidadInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editEspecialidad, setEditEspecialidad] = useState('');

  useEffect(() => {
    const fetchEspecialidades = async () => {
      const especialidadesRef = collection(db, 'especialidades');
      const querySnapshot = await getDocs(especialidadesRef);
      const especialidadesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEspecialidades(especialidadesList);
    };

    fetchEspecialidades();
  }, []);

  const handleAddEspecialidad = async () => {
    if (especialidadInput.trim()) {
      await addDoc(collection(db, 'especialidades'), {
        nombre: especialidadInput,
      });
      setEspecialidadInput('');
    }
  };

  const handleEditEspecialidad = async () => {
    if (editEspecialidad.trim()) {
      const especialidadRef = doc(db, 'especialidades', editId);
      await updateDoc(especialidadRef, { nombre: editEspecialidad });
      setEditId(null);
      setEditEspecialidad('');
    }
  };

  const handleDeleteEspecialidad = async (id) => {
    const especialidadRef = doc(db, 'especialidades', id);
    await deleteDoc(especialidadRef);
  };

  return (
    <div>
      <h2>Gestionar Especialidades</h2>
      
      {/* Agregar especialidad */}
      <Form.Control
        type="text"
        placeholder="Nueva especialidad"
        value={especialidadInput}
        onChange={(e) => setEspecialidadInput(e.target.value)}
      />
      <Button onClick={handleAddEspecialidad} variant="primary" className="mt-2">
        Agregar Especialidad
      </Button>

      {/* Editar especialidad */}
      {editId && (
        <div className="mt-3">
          <Form.Control
            type="text"
            value={editEspecialidad}
            onChange={(e) => setEditEspecialidad(e.target.value)}
          />
          <Button onClick={handleEditEspecialidad} variant="success" className="mt-2">
            Guardar Cambios
          </Button>
        </div>
      )}

      {/* Lista de especialidades */}
      <ListGroup className="mt-3">
        {especialidades.map(especialidad => (
          <ListGroup.Item key={especialidad.id}>
            {especialidad.nombre}
            <Button
              variant="warning"
              size="sm"
              onClick={() => {
                setEditId(especialidad.id);
                setEditEspecialidad(especialidad.nombre);
              }}
              className="ml-2"
            >
              Editar
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleDeleteEspecialidad(especialidad.id)}
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

export default AdminEspecialidades;
