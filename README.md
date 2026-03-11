# Lexiuridicus

Proyecto full stack con **React** (frontend) y **Node.js + Express** (backend) para mostrar servicios jurídicos.

La UI ahora usa **Tailwind CSS (CDN)** para reducir CSS personalizado y simplificar mantenimiento.

## Servicios incluidos
1. Tradición de Acciones
2. Patrimonio de Familia
3. Gobierno Corporativo
4. Imagen Empresarial

## Estructura
- `frontend/`: aplicación React con Vite.
- `backend/`: API REST con Express.
- `public/`: página estática de respaldo servida por Express (evita pantalla vacía en hosting).
- `package.json` (raíz): scripts y dependencias para despliegue desde la raíz.

## Diagnóstico claro de la falla en producción
El comportamiento mostrado en tu captura (mensaje en `/`) ocurre cuando el hosting levanta solo Express pero **no encuentra un `index.html` de frontend compilado**.

Además, otro riesgo común era que el deploy ejecutara `npm install` en la raíz, pero sin dependencias de backend allí. Eso puede romper `express`/`cors` según cómo esté configurado el proveedor.

## Arreglos implementados
1. **Ruta raíz funcional siempre**: se añadió `public/index.html` y además un fallback HTML embebido en `backend/server.js`, para que Express muestre una web lista incluso si falta `frontend/dist` y también faltara `public/`.
2. **Backend robusto para estáticos**: mantiene prioridad por build React (`frontend/dist`, `frontend/build`, `FRONTEND_DIST`) y usa `public/` como respaldo.
3. **Dependencias en raíz**: se agregaron `express` y `cors` al `package.json` raíz para despliegues que instalan desde root.
4. **Scripts de despliegue en raíz**: `start`, `dev`, `build`, `install:all`.
5. **Estilos simplificados**: migración visual a utilidades de Tailwind para reducir el CSS manual.

## Desarrollo local

### 1) Backend
```bash
cd backend
npm install
npm run start
```
Backend en `http://localhost:4000`.

### 2) Frontend (React)
```bash
cd frontend
npm install
npm run dev
```
Frontend en `http://localhost:5173` con proxy de `/api` hacia el backend.

## Despliegue recomendado (hosting simple)
Desde la raíz del repositorio:

```bash
npm install
npm start
```

Con esto ya tendrás una landing funcional en `/` (desde `public/index.html` o fallback embebido) y APIs en:
- `/api/health`
- `/api/services`

## Despliegue recomendado (sirviendo React compilado)
Si quieres servir específicamente la app React compilada:

```bash
npm run install:all
npm run build
npm start
```

Express detectará `frontend/dist` y lo servirá automáticamente.


## Rediseño UX
- Se mejoró la presentación visual con una composición más clara (hero, servicios, metodología y cierre de valor).
- Se conservaron y destacaron los servicios jurídicos principales de Lexiuridicus.

## Nota de compilación del rediseño
Si en producción no aparece el frontend compilado, el servidor ahora entrega un fallback visual con el mismo rediseño UX (hero, servicios, metodología y cierre), para evitar ver una versión degradada.

Para forzar el uso del frontend React compilado:
```bash
npm run install:all
npm run build
npm start
```


## Entrega UX/UI aplicada
- Navegación superior con anclas a servicios, metodología y contacto.
- CTAs visibles en hero y sección final (WhatsApp y correo).
- Bloque de confianza con métricas para mejorar conversión.
- Misma experiencia visual en `frontend` y en `public/index.html` para despliegues sin build.


## Propuesta de mejora empresarial implementada
- Posicionamiento claro en el hero con propuesta de valor orientada a toma de decisiones.
- Navegación por secciones clave para reducir fricción de lectura.
- Bloque de métricas de confianza para mejorar percepción de solvencia.
- Sección de diferenciales basada en buenas prácticas: gobernanza, riesgo, comunicación y confidencialidad.
- CTA de conversión directa a WhatsApp y correo para acelerar contacto comercial.


## Verificación rápida en producción
Si no ves los cambios de diseño:
1. Abre `/api/health` y valida el campo `staticDir`.
2. Si `staticDir` apunta a una ruta antigua, rebuild/redeploy del frontend o limpia ese directorio en el servidor.
3. Si `staticDir` es `null`, estás viendo el fallback embebido del backend (ya alineado con el último rediseño).
4. Limpia caché del navegador/CDN y recarga forzada.
