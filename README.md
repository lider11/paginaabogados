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

## Publicación recomendada (un solo servidor Express)
Para evitar el error **"No se puede obtener /"**, genera el build del frontend y deja que Express lo sirva:

```bash
cd frontend
npm install
npm run build

cd ../backend
npm install
npm run start
```

Con esto, Express sirve `frontend/dist` y la página queda disponible desde `/`.
