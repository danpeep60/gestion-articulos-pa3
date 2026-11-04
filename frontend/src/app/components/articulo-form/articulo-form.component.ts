import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from '../../models/articulo';
import { ArticuloService } from '../../services/articulo.service';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
})
export class ArticuloFormComponent implements OnInit {
  form: FormGroup;
  id: string | null = null;
  mensaje = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', [Validators.required]],
      precio: [null, [Validators.required, Validators.min(0)]],
      descripcion: ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.articuloService.obtenerPorId(this.id).subscribe({
        next: (articulo) => this.form.patchValue(articulo),
        error: () => (this.error = 'No se pudo cargar el artículo'),
      });
    }
  }

  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const articulo: Articulo = this.form.value;
    const peticion = this.id
      ? this.articuloService.actualizar(this.id, articulo)
      : this.articuloService.crear(articulo);

    peticion.subscribe({
      next: () => {
        this.mensaje = this.id ? 'Artículo actualizado correctamente' : 'Artículo registrado correctamente';
        this.error = '';
        setTimeout(() => this.router.navigate(['/articulos']), 1000);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Ocurrió un error al guardar';
        this.mensaje = '';
      },
    });
  }
}