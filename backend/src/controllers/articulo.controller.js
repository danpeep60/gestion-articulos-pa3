import mongoose from 'mongoose';
import Articulo from '../models/Articulo.js';

const idValido = (id) => mongoose.isValidObjectId(id);

export const obtenerArticulos = async (req, res, next) => {
  try {
    const articulos = await Articulo.find().sort({ createdAt: -1 });
    res.json(articulos);
  } catch (error) {
    next(error);
  }
};

export const obtenerArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ mensaje: 'ID no válido' });

    const articulo = await Articulo.findById(id);
    if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json(articulo);
  } catch (error) {
    next(error);
  }
};

export const crearArticulo = async (req, res, next) => {
  try {
    const { nombre, categoria, precio, descripcion } = req.body;
    const articulo = await Articulo.create({ nombre, categoria, precio, descripcion });
    res.status(201).json(articulo);
  } catch (error) {
    next(error);
  }
};

export const actualizarArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ mensaje: 'ID no válido' });

    const { nombre, categoria, precio, descripcion } = req.body;
    const articulo = await Articulo.findByIdAndUpdate(
      id,
      { nombre, categoria, precio, descripcion },
      { new: true, runValidators: true }
    );
    if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json(articulo);
  } catch (error) {
    next(error);
  }
};

export const eliminarArticulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ mensaje: 'ID no válido' });

    const articulo = await Articulo.findByIdAndDelete(id);
    if (!articulo) return res.status(404).json({ mensaje: 'Artículo no encontrado' });
    res.json({ mensaje: 'Artículo eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};