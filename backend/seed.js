import 'dotenv/config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import Articulo from './src/models/Articulo.js';
import User from './src/models/User.js';

const articulos = [
  { nombre: 'Laptop Lenovo IdeaPad', categoria: 'Tecnología', precio: 2499.9, descripcion: 'Laptop 15.6" 8GB RAM, 512GB SSD' },
  { nombre: 'Mouse inalámbrico', categoria: 'Accesorios', precio: 45.5, descripcion: 'Mouse óptico 2.4GHz' },
  { nombre: 'Teclado mecánico', categoria: 'Accesorios', precio: 189, descripcion: 'Switch rojo, retroiluminado' },
  { nombre: 'Monitor 24 pulgadas', categoria: 'Tecnología', precio: 699, descripcion: 'Full HD, 75Hz' },
  { nombre: 'Mochila para laptop', categoria: 'Accesorios', precio: 120, descripcion: 'Resistente al agua' },
  { nombre: 'Audífonos Bluetooth', categoria: 'Audio', precio: 159.9, descripcion: 'Cancelación de ruido' },
];

await mongoose.connect(process.env.MONGO_URI);

// Artículos de prueba
await Articulo.deleteMany();
await Articulo.insertMany(articulos);
console.log('Datos de prueba insertados');

// Usuarios de prueba (las contraseñas se guardan cifradas con bcrypt)
await User.deleteMany();
await User.create([
  { nombre: 'Administrador', email: 'admin@demo.com', password: await bcrypt.hash('Admin123*', 10), rol: 'admin' },
  { nombre: 'Usuario Demo', email: 'user@demo.com', password: await bcrypt.hash('User123*', 10), rol: 'user' },
]);
console.log('Usuarios de prueba creados');

await mongoose.disconnect();