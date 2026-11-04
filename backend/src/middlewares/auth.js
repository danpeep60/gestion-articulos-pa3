import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ mensaje: 'Token requerido' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    res.status(401).json({
      mensaje: e.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido',
    });
  }
};

export const permitirRoles = (...roles) => (req, res, next) =>
  roles.includes(req.user?.rol)
    ? next()
    : res.status(403).json({ mensaje: 'No tienes permisos para esta acción' });