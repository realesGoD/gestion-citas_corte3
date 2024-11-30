import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Importa la configuración de Firebase
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Para obtener el usuario autenticado

const Dashboard = () => {
  const { user } = useAuth();  // Obtener el usuario autenticado
  const [citas, setCitas] = useState([]); // Estado para las citas del usuario
  const [citasDisponibles, setCitasDisponibles] = useState([]); // Estado para las citas disponibles
  const [especialidadFiltro, setEspecialidadFiltro] = useState(''); // Estado para la especialidad seleccionada

  // Función para cargar las citas del usuario
  const fetchCitas = async () => {
    try {
      const q = query(
        collection(db, 'citaID'),
        where('UsuarioID', '==', user.uid) // Filtra por el ID del usuario autenticado
      );
      const querySnapshot = await getDocs(q);
      const citasData = [];
      querySnapshot.forEach((doc) => {
        citasData.push({ id: doc.id, ...doc.data() });  // Agrega el id del documento
      });
      setCitas(citasData);  // Establecer las citas en el estado
    } catch (error) {
      console.error('Error al obtener citas:', error);
    }
  };

  // Función para cargar las citas disponibles
  const fetchCitasDisponibles = async () => {
    try {
      const q = query(
        collection(db, 'citaID'),
        where('Disponibilidad', '==', true) // Filtra las citas disponibles
      );
      const querySnapshot = await getDocs(q);
      const citasDisponiblesData = [];
      querySnapshot.forEach((doc) => {
        citasDisponiblesData.push({ id: doc.id, ...doc.data() });
      });
      setCitasDisponibles(citasDisponiblesData); // Establecer las citas disponibles
    } catch (error) {
      console.error('Error al obtener citas disponibles:', error);
    }
  };

  // Llama a las funciones cuando el usuario se autentica o cambia
  useEffect(() => {
    if (user) {
      fetchCitas();         // Cargar citas del usuario
      fetchCitasDisponibles();  // Cargar citas disponibles
    }
  }, [user]);  // Se ejecuta cuando el usuario cambia

  // Filtrar citas disponibles por especialidad
  const citasDisponiblesFiltradas = especialidadFiltro
    ? citasDisponibles.filter(cita => cita.Especialidad === especialidadFiltro)
    : citasDisponibles;

  // Filtrar citas del usuario por especialidad
  const citasFiltradas = especialidadFiltro
    ? citas.filter(cita => cita.Especialidad === especialidadFiltro)
    : citas;

  const handleReservarCita = async (citaId) => {
    try {
      // Referencia al documento de la cita en Firestore
      const citaRef = doc(db, 'citaID', citaId);

      // Actualizar la cita en Firestore (cambiar Disponibilidad y asignar UsuarioID)
      await updateDoc(citaRef, {
        Disponibilidad: false, // Marcar como no disponible
        UsuarioID: user.uid,   // Asignar el UsuarioID del usuario autenticado
      });

      // Después de actualizar, recargar las citas disponibles y las del usuario
      fetchCitas();
      fetchCitasDisponibles();
      alert('Cita reservada exitosamente!');
    } catch (error) {
      console.error('Error al reservar la cita:', error);
      alert('Hubo un error al reservar la cita. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis Citas</h2>
      {/* Filtro por especialidad */}
      <div className="mb-3">
        <label htmlFor="especialidad" className="form-label">Filtrar por especialidad</label>
        <select
          id="especialidad"
          className="form-select"
          value={especialidadFiltro}
          onChange={(e) => setEspecialidadFiltro(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Cardiologia">Cardiología</option>
          <option value="Pediatria">Pediatría</option>
          <option value="Dermatologia">Dermatología</option>
          {/* Agregar más especialidades según sea necesario */}
        </select>
      </div>

      {/* Mostrar las citas filtradas */}
      {citasFiltradas.length > 0 ? (
        citasFiltradas.map((cita) => (
          <div key={cita.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{cita.Descripcion}</h5>
              <p className="card-text">
                <strong>Fecha:</strong> {cita.Fecha.toDate().toLocaleString()}
              </p>
              <p className="card-text"><strong>Médico:</strong> {cita.Medico}</p>
              <p className="card-text"><strong>Especialidad:</strong> {cita.Especialidad}</p>
              <p className="card-text">
                <strong>Disponibilidad:</strong> {cita.Disponibilidad ? 'Disponible' : 'No disponible'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No tienes citas reservadas.</p>
      )}

      <hr />

      <h2>Citas Disponibles</h2>

      {/* Mostrar las citas disponibles filtradas */}
      {citasDisponiblesFiltradas.length > 0 ? (
        citasDisponiblesFiltradas.map((cita) => (
          <div key={cita.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{cita.Descripcion}</h5>
              <p className="card-text">
                <strong>Fecha:</strong> {cita.Fecha.toDate().toLocaleString()}
              </p>
              <p className="card-text"><strong>Médico:</strong> {cita.Medico}</p>
              <p className="card-text"><strong>Especialidad:</strong> {cita.Especialidad}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleReservarCita(cita.id)} // Llama a la función al hacer clic
              >
                Reservar Cita
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay citas disponibles en este momento.</p>
      )}
    </div>
  );
};

export default Dashboard;
