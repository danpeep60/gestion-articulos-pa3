import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, Rol, Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly url = `${environment.apiUrl}/auth`;
  private userSubject = new BehaviorSubject<Usuario | null>(this.leerUsuario());

  // Los componentes se suscriben a esto para saber quién inició sesión
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  private leerUsuario(): Usuario | null {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  }

  private guardarSesion(respuesta: AuthResponse): void {
    localStorage.setItem('token', respuesta.token);
    localStorage.setItem('user', JSON.stringify(respuesta.user));
    this.userSubject.next(respuesta.user);
  }

  // Revisa que el token exista y no haya vencido
  private tokenVigente(token: string | null): boolean {
    if (!token) return false;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/login`, { email, password })
      .pipe(tap((r) => this.guardarSesion(r)));
  }

  register(nombre: string, email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this.url}/register`, { nombre, email, password })
      .pipe(tap((r) => this.guardarSesion(r)));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.tokenVigente(this.token);
  }

  esAdmin(): boolean {
    return this.userSubject.value?.rol === Rol.Admin;
  }
}