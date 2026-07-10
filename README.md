# Consumo de Web Services REST con Angular 22

Práctica de la asignatura Aplicaciones Web — Ingeniería de Software — UTEQ.

Versiones usadas (evidenciar con `node --version` y `ng version`):

- Node.js: v22.x (o superior)
- Angular CLI / Core: 22.x
- TypeScript: 6.x

## Estructura del proyecto

```
consumo-rest/
├── proxy.conf.json              # Paso 7: proxy /api -> API real (resuelve CORS en dev)
├── src/
│   ├── index.html
│   ├── main.ts                  # bootstrap zoneless de la app
│   ├── styles.css
│   └── app/
│       ├── app.config.ts        # Paso 1: provideHttpClient()
│       ├── producto.model.ts    # Paso 2: interfaz Producto
│       ├── producto.service.ts  # Paso 3 + 6: CRUD tipado y manejo de errores
│       ├── lista-productos.component.ts   # Paso 4: httpResource + eliminar (DELETE)
│       ├── nuevo-producto.component.ts    # Paso 5: crear (POST)
│       └── app.component.ts     # integra listado + creación + eliminación
```

## Cómo ejecutar el proyecto

**1. Verificar versiones (evidencia requerida en la entrega):**

```bash
node --version   # debe reportar v22.x o superior
ng version       # @angular/core y @angular/cli deben coincidir en 22.x
```

**2. Instalar dependencias:**

```bash
npm install
```

**3. Levantar una API REST de prueba en `http://localhost:8080`** que exponga
`/api/productos` con las operaciones GET/POST/PUT/DELETE (por ejemplo, un
`json-server` con un `db.json` que contenga un arreglo `productos`, o su propio
backend). Ejemplo rápido con json-server:

```bash
npx json-server --watch db.json --port 8080
```

donde `db.json` podría ser:

```json
{
  "productos": [
    { "id": 1, "nombre": "Mouse", "precio": 12.5, "disponible": true },
    { "id": 2, "nombre": "Teclado", "precio": 25.9, "disponible": true }
  ]
}
```

**4. Primero, evidencia del error de CORS (sin proxy):**

```bash
ng serve -o
```

Con la API corriendo en el puerto 8080 y el frontend en el 4200, abra la
consola del navegador: al listar productos verá el error de CORS (status 0)
descrito en el Paso 6 de la guía. Tome la captura de este error para el
entregable.

**5. Ahora, con el proxy (soluciona el CORS en desarrollo):**

```bash
ng serve --proxy-config proxy.conf.json -o
# o, equivalentemente:
npm start
```

Abra `http://localhost:4200`: la lista de productos debe cargar sin error de
CORS, ya que todas las peticiones a `/api/...` son redirigidas por el proxy
hacia `http://localhost:8080` en el mismo origen del navegador. Tome la
captura de la vista ya funcionando para el entregable.

**6. Probar las operaciones del entregable:**

- (a) Listar: la sección "Productos" usa `httpResource`, mostrando "Cargando..."
  mientras carga y un mensaje de error si la petición falla.
- (b) Crear: use el formulario "Nuevo producto" (POST); al guardar, la lista
  se refresca automáticamente.
- (c) Eliminar: use el botón "Eliminar" de cada producto (DELETE); la lista
  se refresca llamando a `productos.reload()`.
- (d) Proxy: confirmado en los pasos 4 y 5 anteriores.

## Evidencia de CORS para el entregable

Adjunte junto a este README:

1. Captura de la consola del navegador mostrando el error de CORS al correr
   `ng serve -o` sin el proxy (paso 4).
2. Captura de la aplicación funcionando correctamente al correr con
   `ng serve --proxy-config proxy.conf.json -o` (paso 5).

## Checklist de la rúbrica (10.0 puntos)

| Criterio | Dónde se cumple en este repo |
|---|---|
| Configuración del cliente HTTP y del proxy (2.0) | `src/app/app.config.ts`, `proxy.conf.json` |
| Servicio con GET/POST/DELETE tipadas (3.0) | `src/app/producto.service.ts` (incluye también PUT) |
| Lectura reactiva con httpResource, estados carga/error (2.5) | `src/app/lista-productos.component.ts` |
| Manejo de errores por código de estado (1.5) | `manejarError()` en `producto.service.ts` |
| Evidencia de diagnóstico y resolución de CORS (1.0) | Capturas descritas arriba (a agregar por el estudiante) |

