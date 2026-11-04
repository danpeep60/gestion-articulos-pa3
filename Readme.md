# Gestion de Articulos

Esta es una aplicación web para guardar y organizar artículos (por ejemplo productos de una tienda). Con esto de puede hacer: 

**Agregar** un artículo nuevo
**Ver** la lista de todos los artículos
**Editar** un artículo que ya existe
**Eliminar** un artículo (primero me pregunta si estoy seguro)

Lo importante: los datos no se pierden al cerrar la página, porque se guardan en una base de datos real (MongoDB).

---

## ¿Como funciona?

La aplicación tiene tres partes que trabajan juntas:

1. **Frontend (lo que se ve):** las pantallas con botones y formularios. Esta hecho con Angular.
2. **Backend (el cerebro):** recibe lo que pides en la pantalla y se encarga de guardarlo o buscarlo. Esta hecho con Node.js y Express.
3. **Base de datos (la memoria):** donde se guardan los articulos. Es MongoDB.

Es como un restaurante: el frontend es el mesero que toma tu pedido, el backend es la cocina que lo prepara y la base de datos es la despensa donde se guarda todo.

## Tecnologias que use

- **Angular 16** y **TypeScript** para las pantallas
- **Bootstrap 5** para que se vea ordenado y se adapte al celular
- **Node.js** y **Express** para el servidor
- **MongoDB** (con Mongoose) para guardar los datos
- **Visual Studio Code** para programar y **MongoDB Compass** para ver la base de datos


## ¿Que hay en cada carpeta?

```
gestion-articulos/
    backend/                 → el servidor
         src/
            config/          → conexion con MongoDB
            models/          → cómo es un articulo (nombre, precio, etc.)
            controllers/     → lo que se hace al crear, ver, editar o borrar
            middlewares/     → revisa que los datos estén bien antes de guardarlos
            routes/          → las direcciones de la API
            server.js        → archivo que enciende el servidor
        seed.js              → agrega articulos de ejemplo
        .env.example         → ejemplo de configuración

    frontend/                → las pantallas
        src/app/
            models/          → la forma de un artículo en TypeScript
            services/        → habla con el servidor
            components/
                dashboard/       → pantalla principal con resumen
                articulo-list/   → tabla con todos los artículos
                articulo-form/   → formulario para crear y editar

    README.md                → este archivo
```

## ¿Que necesito para probarlo?

Instala esto antes de empezar:

1. **Node.js** (version 18 o más nueva)
2. **MongoDB Community Server** (dejalo funcionando como servicio)
3. **Angular CLI 16**. Se instala escribiendo esto en la terminal:
```
   npm install -g @angular/cli@16
```

## Como encender el proyecto, paso a paso

Necesitas **dos terminales abiertas al mismo tiempo**: una para el backend y otra para el frontend. No cierres ninguna mientras uses la aplicación.

### Terminal 1: el backend

1. Entra a la carpeta del backend:
```
   cd backend
```
2. Instala lo que necesita el proyecto:
```
   npm install
```
3. Crea un archivo llamado .env dentro de backend y copia esto adentro:
```
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/gestion_articulos
```
4. Agrega los artículos de ejemplo:
```
   npm run seed
```
   Debe aparecer: Datos de prueba insertados.
5. Enciende el servidor:
```
   npm run dev
```
   Debe aparecer: MongoDB conectado y Servidor en http://localhost:3000.

### Terminal 2: el frontend

1. Abre otra terminal y entra a la carpeta del frontend:
```
   cd frontend
```
2. Instala lo que necesita el proyecto:
```
   npm install
```
3. Enciende la aplicación:
```
   ng serve
```
4. Cuando termine de cargar, abre el navegador en:
```
   http://localhost:4200
```

## ¿Cómo uso la aplicación?

- **Dashboard:** muestra cuántos artículos hay, el precio promedio y las categorías.
- **Artículos:** muestra la tabla con todos los artículos. Desde ahí puedes editar o eliminar.
- **Nuevo artículo:** formulario para agregar uno. Si dejas un campo obligatorio vacío o pones un precio negativo, te avisa en rojo.
- **Eliminar:** antes de borrar, pregunta si estás seguro.