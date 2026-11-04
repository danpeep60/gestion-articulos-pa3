import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-articulo-list',
  templateUrl: './articulo-list.component.html',
})
export class ArticuloListComponent implements OnInit {
  articulos: Articulo[] = [];
  mensaje = '';
  error = '';

  constructor(
    private articuloService: ArticuloService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.articuloService.obtenerTodos().subscribe({
      next: (datos) => (this.articulos = datos),
      error: () => (this.error = 'No se pudieron cargar los artículos'),
    });
  }

  eliminar(articulo: Articulo): void {
    if (!articulo._id) return;
    const confirmado = confirm(`¿Seguro que deseas eliminar "${articulo.nombre}"?`);
    if (!confirmado) return;

    this.articuloService.eliminar(articulo._id).subscribe({
      next: (resp) => {
        this.mensaje = resp.mensaje;
        this.error = '';
        this.cargar(); // actualiza la lista
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al eliminar';
        this.mensaje = '';
      },
    });
  }
}