import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Asegúrate de que el archivo firebase.js está configurado correctamente

const PrivateRoute = () => {
  const [user, loading, error] = useAuthState(auth); // Obtiene el estado de autenticación
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false); // Deja de cargar cuando el estado de autenticación esté listo
    }
  }, [loading]);

  if (isLoading) {
    return <div>Loading...</div>; // Muestra un loading mientras se verifica el estado de autenticación
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Si no hay usuario autenticado, redirige al login
  }

  return <Outlet />; // Si el usuario está autenticado, permite el acceso a la ruta protegida
};

export default PrivateRoute;
