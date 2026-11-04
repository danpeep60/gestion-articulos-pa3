# Changelog

Registro de cambios, correcciones y mejoras del proyecto Gestión de Artículos.

## [1.1.0] - 2026-11-03 (PA3)

### Añadido
- Modelo `User` con roles `admin` y `user`.
- Registro e inicio de sesión con contraseñas cifradas con bcrypt y autenticación con JWT.
- Middlewares `verificarToken` y `permitirRoles`; las rutas de artículos exigen sesión y solo el administrador puede crear, editar o eliminar.
- Validaciones de registro y login (`validarAuth.js`).
- Variables de entorno `JWT_SECRET`, `JWT_EXPIRES_IN` y `CORS_ORIGINS`, y archivo `.env.example`.
- Usuarios de prueba (admin y user) en `seed.js`.
- Angular: `AuthService`, interceptor HTTP que agrega el token, guards `authGuard` y `adminGuard`, pantallas de login y registro, y menú según la sesión.
- Angular: enum `Rol`, interfaces `Usuario` y `AuthResponse`, y clase genérica `CrudService<T>`.
- Archivos `environments` para configurar la URL de la API.

### Cambiado
- Las rutas de Angular están protegidas por sesión y por rol.
- Los botones de crear, editar y eliminar solo se muestran al administrador (lista y dashboard).
- El CORS del backend se lee desde una variable de entorno.
- `ArticuloService` ahora extiende `CrudService<Articulo>`.

### Refactorizado
- Dashboard: los cálculos pasaron a funciones puras (`articulos.utils.ts`) y la carga de datos usa `async/await`.

### Corregido
- `seed.js`: los usuarios se crean antes de cerrar la conexión con MongoDB.
- `articulo.routes.js`: se eliminó código duplicado pegado por error.
- Login y registro con cuerpo vacío responden 400 en lugar de 500.
- Panel React (Vite + TypeScript) con React Router DOM, Hooks y Axios.
- Estado global de la sesión con Context API (`AuthContext`).
- Ruta protegida, cierre de sesión y manejo de token expirado en React.
- CRUD de artículos en React consumiendo la misma API REST que Angular.
- Configuración de despliegue: MongoDB Atlas, Render (API) y Vercel (Angular y React).

## [1.0.0] - 2026-10-17 (PA2)

### Añadido
- CRUD de artículos con Angular 16, Express y MongoDB.
- Validaciones en backend y formularios reactivos en Angular.
- Dashboard con total de artículos, precio promedio y categorías.