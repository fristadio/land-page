import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { setLang } from '../i18n';

/**
 * Componente que redireciona /en para / e define o idioma como inglês
 * Usado para lidar com URLs antigas indexadas pelo Google
 */
export function EnglishRedirect() {
  useEffect(() => {
    // Define o idioma como inglês antes de redirecionar
    setLang('en');
  }, []);

  return <Navigate to="/" replace />;
}

