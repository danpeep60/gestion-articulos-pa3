import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Articulo } from '../models/articulo';
import { CrudService } from './crud.service';

@Injectable({ providedIn: 'root' })
export class ArticuloService extends CrudService<Articulo> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/articulos`);
  }
}