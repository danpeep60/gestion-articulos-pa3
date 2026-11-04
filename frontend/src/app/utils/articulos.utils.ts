import { Articulo } from '../models/articulo';

// Funciones puras: no modifican la lista original y siempre devuelven lo mismo para los mismos datos

export const calcularPrecioPromedio = (articulos: readonly Articulo[]): number =>
  articulos.length
    ? articulos.reduce((suma, a) => suma + a.precio, 0) / articulos.length
    : 0;

export const obtenerCategoriasUnicas = (articulos: readonly Articulo[]): string[] =>
  [...new Set(articulos.map((a) => a.categoria))];

export const filtrarPorCategoria = (articulos: readonly Articulo[], categoria: string): Articulo[] =>
  categoria ? articulos.filter((a) => a.categoria === categoria) : [...articulos];