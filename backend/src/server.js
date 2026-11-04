import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { conectarDB } from './config/db.js';
import articuloRoutes from './routes/articulo.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Sitios autorizados a usar la API (Angular y React)
const origenes = (process.env.CORS_ORIGINS || 'http://localhost:4200').split(',');
app.use(cors({ origin: origenes }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Gestión de Artículos funcionando' });
});

app.use('/api/auth', authRoutes);
app.use('/api/articulos', articuloRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Manejo central de errores
app.use((error, req, res, next) => {
  console.error(error);
  if (error.name === 'ValidationError') {
    const mensajes = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ mensaje: mensajes.join('. ') });
  }
  if (error.code === 11000) {
    return res.status(409).json({ mensaje: 'El correo ya está registrado' });
  }
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

conectarDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
});