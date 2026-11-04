import mongoose from 'mongoose';

const articuloSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true, minlength: 3 },
    categoria: { type: String, required: [true, 'La categoría es obligatoria'], trim: true },
    precio: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio no puede ser negativo'] },
    descripcion: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Articulo', articuloSchema);