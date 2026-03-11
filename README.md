# Lexiuridicus

Proyecto full stack con **React** (frontend) y **Node.js + Express** (backend) para mostrar servicios jurídicos.

## Servicios incluidos
1. Tradición de Acciones
2. Patrimonio de Familia
3. Gobierno Corporativo
4. Imagen Empresarial

## Estructura
- `frontend/`: aplicación React con Vite.
- `backend/`: API REST con Express.
- `package.json` (raíz): scripts de despliegue para hosting.

## Desarrollo local

### 1) Backend
```bash
cd backend
npm install
npm run start
```
Backend en `http://localhost:4000`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend en `http://localhost:5173` con proxy de `/api` hacia el backend.

## Solución al error "No se puede obtener /"
En producción, Express debe servir el frontend compilado. Este proyecto ya está preparado para eso y busca `index.html` en:
- `FRONTEND_DIST` (si defines variable de entorno)
- `frontend/dist`
- `frontend/build`
- `public`

### Flujo recomendado de despliegue
Desde la raíz del repositorio:

```bash
npm run install:all
npm run build
npm start
```

Si el frontend aún no está compilado, `/` mostrará una página informativa (no el error *Cannot GET /*) y las APIs seguirán disponibles en:
- `/api/health`
- `/api/services`
