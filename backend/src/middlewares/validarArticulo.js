export const validarArticulo = (req, res, next) => {
  const { nombre, categoria, precio } = req.body;
  const errores = [];

  if (!nombre || nombre.trim().length < 3) errores.push('El nombre debe tener al menos 3 caracteres');
  if (!categoria || !categoria.trim()) errores.push('La categoría es obligatoria');
  if (precio === undefined || precio === '' || isNaN(Number(precio)) || Number(precio) < 0) {
    errores.push('El precio debe ser un número mayor o igual a 0');
  }

  if (errores.length > 0) {
    return res.status(400).json({ mensaje: errores.join('. ') });
  }
  next();
};