import { useEffect, useState, type FormEvent } from 'react';
import { http, mensajeDeError } from '../api/http';
import { useAuth } from '../context/AuthContext';

interface Articulo {
  _id?: string;
  nombre: string;
  categoria: string;
  precio: number;
  descripcion?: string;
}

const vacio: Articulo = { nombre: '', categoria: '', precio: 0, descripcion: '' };

export default function Articulos() {
  const { user, logout } = useAuth();
  const esAdmin = user?.rol === 'admin';

  const [lista, setLista] = useState<Articulo[]>([]);
  const [form, setForm] = useState<Articulo>(vacio);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const cargar = async () => {
    try {
      const { data } = await http.get<Articulo[]>('/articulos');
      setLista(data);
    } catch (err) {
      setError(mensajeDeError(err, 'No se pudieron cargar los artículos'));
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (e: FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (form.nombre.trim().length < 3) return setError('El nombre debe tener al menos 3 caracteres');
    if (!form.categoria.trim()) return setError('La categoría es obligatoria');
    if (form.precio < 0) return setError('El precio no puede ser negativo');

    try {
      if (form._id) {
        await http.put(`/articulos/${form._id}`, form);
        setMensaje('Artículo actualizado correctamente');
      } else {
        await http.post('/articulos', form);
        setMensaje('Artículo registrado correctamente');
      }
      setForm(vacio);
      await cargar();
    } catch (err) {
      setError(mensajeDeError(err, 'Error al guardar el artículo'));
    }
  };

  const eliminar = async (articulo: Articulo) => {
    if (!articulo._id) return;
    if (!window.confirm(`¿Seguro que deseas eliminar "${articulo.nombre}"?`)) return;
    setMensaje('');
    setError('');
    try {
      const { data } = await http.delete(`/articulos/${articulo._id}`);
      setMensaje(data.mensaje);
      await cargar();
    } catch (err) {
      setError(mensajeDeError(err, 'Error al eliminar el artículo'));
    }
  };

  return (
    <div className="tarjeta">
      <header className="encabezado">
        <h2>Artículos</h2>
        <div>
          <span>{user?.nombre} ({user?.rol})</span>
          <button className="secundario" onClick={logout}>Cerrar sesión</button>
        </div>
      </header>

      {mensaje && <p className="alerta ok">{mensaje}</p>}
      {error && <p className="alerta error">{error}</p>}

      {esAdmin && (
        <form onSubmit={guardar} className="formulario">
          <h3>{form._id ? 'Editar artículo' : 'Nuevo artículo'}</h3>
          <input placeholder="Nombre" value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          <input placeholder="Categoría" value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })} />
          <input type="number" step="0.01" placeholder="Precio" value={form.precio}
            onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })} />
          <input placeholder="Descripción" value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
          <div>
            <button type="submit">{form._id ? 'Actualizar' : 'Registrar'}</button>
            {form._id && (
              <button type="button" className="secundario" onClick={() => setForm(vacio)}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descripción</th>
            {esAdmin && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {lista.map((a) => (
            <tr key={a._id}>
              <td>{a.nombre}</td>
              <td>{a.categoria}</td>
              <td>S/ {a.precio.toFixed(2)}</td>
              <td>{a.descripcion}</td>
              {esAdmin && (
                <td>
                  <button onClick={() => setForm(a)}>Editar</button>
                  <button className="peligro" onClick={() => eliminar(a)}>Eliminar</button>
                </td>
              )}
            </tr>
          ))}
          {lista.length === 0 && (
            <tr><td colSpan={esAdmin ? 5 : 4}>No hay artículos registrados</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}