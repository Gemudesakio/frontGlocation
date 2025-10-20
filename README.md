Frontend – Glocation Projects (React + Vite + Tailwind)

SPA para gestionar proyectos (listar, crear, editar, eliminar), ver estadísticas (gráfico) y un resumen generado desde el backend.

Requisitos

Node.js 18+ (recomendado 20 LTS)

npm 9+

Backend corriendo en http://localhost:8080

Endpoints que usa el frontend:

GET /api/projects/all

POST /api/projects/create

PUT /api/projects/update/:id

DELETE /api/projects/deleteParam/:id

GET /api/projects/graphics (estadísticas)

GET /api/projects/summary (resumen IA)

Clonar e instalar
git clone https://github.com/<tu-usuario>/<tu-repo-frontend>.git
cd <tu-repo-frontend>
npm install

Configurar la URL del backend

Si tu backend no corre en http://localhost:8080, edita este archivo:

// src/services/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // ← cambia esta URL si tu backend usa otra
})

export default api

Ejecutar en desarrollo
npm run dev
