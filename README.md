💻 FRONTEND
Glocation Projects — React + Vite + Tailwind
Descripción general

SPA para gestionar proyectos: listar, crear, editar y eliminar.
Consume la API REST del backend y muestra información adicional como estadísticas y resumen de proyectos.

⚙️ Instalación y ejecución
1. Requisitos previos

Node.js 18+ (recomendado 20 LTS)

npm 9+

Backend en ejecución en http://localhost:8080

2. Clonar e instalar
git clone https://github.com/<tu-usuario>/<tu-repo-frontend>.git
cd <tu-repo-frontend>
npm install

3. Configurar API base

Si tu backend usa otro puerto o dominio, modifica src/services/api.js:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Cambiar si tu backend está en otra URL
});

export default api;

4. Ejecutar en desarrollo
npm run dev


Aplicación disponible en:
http://localhost:5173

🧠 Decisiones técnicas

Vite para rendimiento y recarga instantánea.

React Router DOM para navegación SPA.

Redux Toolkit para gestión global del estado.

Tailwind CSS para un diseño rápido y responsivo.

🔗 Endpoints consumidos
Método	Endpoint	Uso en frontend
GET	/api/projects/all	Listar proyectos
POST	/api/projects/create	Crear proyecto
PUT	/api/projects/update/:id	Editar proyecto
DELETE	/api/projects/deleteParam/:id	Eliminar proyecto
GET	/api/projects/graphics	Estadísticas
GET	/api/projects/summary	Resumen IA (si se implementa)
📘 Ejemplo de integración
// src/features/projects/api.js
import api from "../../services/api";

export const getProjects = async () => {
  const { data } = await api.get("/projects/all");
  return data.response;
};

export const createProject = async (project) => {
  const { data } = await api.post("/projects/create", project);
  return data.response;
};


Ejemplo de respuesta:

{
  "success": true,
  "message": "Proyectos obtenidos correctamente",
  "response": [
    {
      "id": 1,
      "nombre": "Sistema de reservas",
      "estado": true
    }
  ]
}

Autor

Luis Eduardo Rivera Martos
Desarrollador Full-Stack
Universidad del Cauca — Popayán, Colombia
