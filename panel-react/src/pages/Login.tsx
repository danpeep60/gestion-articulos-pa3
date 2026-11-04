import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mensajeDeError } from '../api/http';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(() => {
    const expirada = sessionStorage.getItem('sesionExpirada');
    sessionStorage.removeItem('sesionExpirada');
    return expirada ? 'Tu sesión expiró. Inicia sesión nuevamente.' : '';
  });
  const [cargando, setCargando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      setError('Ingresa un correo válido y una contraseña de mínimo 6 caracteres');
      return;
    }

    setCargando(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudo iniciar sesión'));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="tarjeta pequena">
      <h2>Panel de administración</h2>
      {error && <p className="alerta error">{error}</p>}
      <form onSubmit={enviar}>
        <label>Correo</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}