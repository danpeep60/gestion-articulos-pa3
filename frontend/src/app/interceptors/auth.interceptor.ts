import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Se usa Injector para evitar una dependencia circular con HttpClient
  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const auth = this.injector.get(AuthService);
    const token = auth.token;

    // Agrega el token a cada petición
    const peticion = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next.handle(peticion).pipe(
      catchError((error) => {
        // Si el token venció o es inválido, se cierra la sesión
        if (error.status === 401 && !req.url.includes('/auth/')) {
          auth.logout();
        }
        return throwError(() => error);
      })
    );
  }
}