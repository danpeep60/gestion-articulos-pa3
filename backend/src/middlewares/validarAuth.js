const emailValido = (e) => /^\S+@\S+\.\S+$/.test(e || '');

export const validarRegistro = (req, res, next) => {
  const { nombre, email, password } = req.body;
  const errores = [];
  if (!nombre || nombre.trim().length < 3) errores.push('El nombre debe tener al menos 3 caracteres');
  if (!emailValido(email)) errores.push('El correo no es válido');
  if (!password || password.length < 6) errores.push('La contraseña debe tener al menos 6 caracteres');
  if (errores.length) return res.status(400).json({ mensaje: errores.join('. ') });
  next();
};

export const validarLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!emailValido(email) || !password)
    return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
  next();
};