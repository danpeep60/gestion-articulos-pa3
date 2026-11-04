import { Router } from 'express';
import {
  obtenerArticulos,
  obtenerArticulo,
  crearArticulo,
  actualizarArticulo,
  eliminarArticulo,
} from '../controllers/articulo.controller.js';
import { validarArticulo } from '../middlewares/validarArticulo.js';
import { verificarToken, permitirRoles } from '../middlewares/auth.js';

const router = Router();

// Todas las rutas exigen sesión iniciada (token válido)
router.use(verificarToken);

// Cualquier usuario con sesión puede ver artículos
router.get('/', obtenerArticulos);
router.get('/:id', obtenerArticulo);

// Solo el administrador puede crear, editar y eliminar
router.post('/', permitirRoles('admin'), validarArticulo, crearArticulo);
router.put('/:id', permitirRoles('admin'), validarArticulo, actualizarArticulo);
router.delete('/:id', permitirRoles('admin'), eliminarArticulo);

export default router;