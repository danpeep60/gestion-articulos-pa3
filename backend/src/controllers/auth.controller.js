import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const firmar = (u) =>
  jwt.sign({ id: u._id, rol: u.rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
const limpio = (u) => ({ id: u._id, nombre: u.nombre, email: u.email, rol: u.rol });

export const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body; // el rol nunca se toma del body
    if (await User.findOne({ email: email.toLowerCase() }))
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash });
    res.status(201).json({ token: firmar(user), user: limpio(user) });
  } catch (error) {
    next(error);
  }
};

export const iniciarSesion = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    res.json({ token: firmar(user), user: limpio(user) });
  } catch (error) {
    next(error);
  }
};