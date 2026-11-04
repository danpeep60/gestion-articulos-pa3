import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';
import { AuthService } from '../../services/auth.service';
import { calcularPrecioPromedio, obtenerCategoriasUnicas } from '../../utils/articulos.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  total = 0;
  precioPromedio = 0;
  categorias: string[] = [];
  recientes: Articulo[] = [];
  error = '';

  constructor(
    private articuloService: ArticuloService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  private async cargarDatos(): Promise<void> {
    try {
      const datos = await firstValueFrom(this.articuloService.obtenerTodos());
      this.total = datos.length;
      this.precioPromedio = calcularPrecioPromedio(datos);
      this.categorias = obtenerCategoriasUnicas(datos);
      this.recientes = datos.slice(0, 5);
    } catch {
      this.error = 'No se pudo conectar con el servidor';
    }
  }
}