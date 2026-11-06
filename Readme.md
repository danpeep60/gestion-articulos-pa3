# Gestión de Artículos (PA3)

Aplicación web Full Stack para gestionar artículos, con autenticación JWT y control de acceso por roles.

## Enlaces
- **Angular (interfaz principal):** https://gestion-articulos-pa3.vercel.app
- **Panel React:** https://gestion-articulos-panel-react.vercel.app
- **API (backend):** https://gestion-articulos-pa3.onrender.com
- **Repositorio:** https://github.com/danpeep60/gestion-articulos-pa3

> La API está en el plan gratuito de Render y se suspende tras 15 minutos sin uso. El primer acceso puede tardar hasta un minuto.

## Tecnologías
- **Frontend principal:** Angular 16 + TypeScript
- **Panel secundario:** React + TypeScript (Vite), React Router DOM, Context API, Axios
- **Backend:** Node.js, Express, Mongoose
- **Base de datos:** MongoDB (Atlas en producción)
- **Seguridad:** bcrypt, JSON Web Tokens (JWT)
- **Despliegue:** Render (API), Vercel (Angular y React), MongoDB Atlas

## Estructura
```
gestion-articulos/
├── backend/        API REST (Express + MongoDB)
├── frontend/       Angular 16 (interfaz principal)
├── panel-react/    Panel secundario en React
├── bd/             Exportación de la base de datos de prueba
├── Evidencias/     Capturas de la PA2
└── CHANGELOG.md
```

## Roles
| Rol | Permisos |
|---|---|
| admin | Ver, crear, editar y eliminar artículos |
| user | Solo ver artículos |

## Usuarios de prueba
| Correo | Contraseña | Rol |
|---|---|---|
| admin@demo.com | Admin123* | admin |
| user@demo.com | User123* | user |

## Requisitos
- Node.js 18 o superior
- MongoDB local (o una cuenta gratuita de MongoDB Atlas)
- Angular CLI 16 (`npm install -g @angular/cli@16`)

## Instalación y ejecución local

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # en Windows: copy .env.example .env
# edita .env con tus valores
npm run seed
npm run dev
```
La API queda en http://localhost:3000

### 2. Angular
```bash
cd frontend
npm install
ng serve
```
Abre http://localhost:4200

### 3. Panel React
```bash
cd panel-react
npm install
cp .env.example .env
npm run dev
```
Abre http://localhost:5173

## Variables de entorno
- Backend (`backend/.env.example`): `PORT`, `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGINS`.
- React (`panel-react/.env.example`): `VITE_API_URL`.
- Angular: la URL de la API está en `frontend/src/environments/`.

## Endpoints
| Método | Ruta | Acceso |
|---|---|---|
| POST | /api/auth/register | Público |
| POST | /api/auth/login | Público |
| GET | /api/articulos | Usuario con sesión |
| GET | /api/articulos/:id | Usuario con sesión |
| POST | /api/articulos | Solo admin |
| PUT | /api/articulos/:id | Solo admin |
| DELETE | /api/articulos/:id | Solo admin |

Las rutas protegidas exigen el encabezado `Authorization: Bearer <token>`.
