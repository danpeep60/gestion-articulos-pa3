import { Router } from 'express';
import { registrar, iniciarSesion } from '../controllers/auth.controller.js';
import { validarRegistro, validarLogin } from '../middlewares/validarAuth.js';

const router = Router();
router.post('/register', validarRegistro, registrar);
router.post('/login', validarLogin, iniciarSesion);
export default router;