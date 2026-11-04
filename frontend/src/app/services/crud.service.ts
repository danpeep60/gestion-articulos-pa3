import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export abstract class CrudService<T> {
  constructor(protected http: HttpClient, protected url: string) {}
  obtenerTodos(): Observable<T[]> { return this.http.get<T[]>(this.url); }
  obtenerPorId(id: string): Observable<T> { return this.http.get<T>(`${this.url}/${id}`); }
  crear(data: T): Observable<T> { return this.http.post<T>(this.url, data); }
  actualizar(id: string, data: T): Observable<T> { return this.http.put<T>(`${this.url}/${id}`, data); }
  eliminar(id: string): Observable<{ mensaje: string }> { return this.http.delete<{ mensaje: string }>(`${this.url}/${id}`); }
}