import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true, minlength: [3, 'El nombre debe tener al menos 3 caracteres'] },
    email: { type: String, required: [true, 'El correo es obligatorio'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    rol: { type: String, enum: ['admin', 'user'], default: 'user' },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);