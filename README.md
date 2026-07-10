# Consumo de Web Services REST con Angular 22

**Práctica de la asignatura Aplicaciones Web — Ingeniería de Software — UTEQ**

Este proyecto implementa una arquitectura moderna de **Angular 22** utilizando **Zoneless**, **Signals** y **`httpResource`**, conectándose de forma reactiva a un backend simulado mediante **JSON Server**. Para resolver las restricciones de intercambio de recursos de origen cruzado (**CORS**), se utiliza un **proxy de desarrollo** configurado en Angular.



---

# Guía de Ejecución Paso a Paso

Para ejecutar correctamente la aplicación es necesario trabajar con **dos terminales**.

## Paso 1. Instalar las dependencias

Abra una terminal en la carpeta raíz del proyecto y ejecute:

```bash
npm install
```

---

## Paso 2. Levantar el servidor de datos (Terminal 1)

Ejecute el servidor REST utilizando **JSON Server**:

```bash
npx json-server --watch db.json --port 8080
```

El archivo `db.json` inicia con la colección vacía:

```json
{
  "productos": []
}
```

Esto permite observar únicamente los registros creados durante la práctica.

---

## Paso 3. Evidencia del error de CORS (Opcional)

Para evidenciar el problema de CORS, abra una segunda terminal y ejecute Angular sin proxy:

```bash
ng serve -o
```

Al ingresar a:

```
http://localhost:4200
```

La consola del navegador mostrará un error de comunicación (**Status 0 / Error de CORS**), el cual será capturado por el bloque de control de flujo:

```ts
@else if (productos.error())
```
---

## Paso 4. Ejecutar Angular utilizando el Proxy (Terminal 2)

Detenga el servidor anterior con:

```text
Ctrl + C
```

Luego inicie nuevamente Angular utilizando el archivo de configuración del proxy:

```bash
ng serve --proxy-config proxy.conf.json -o
```

Ahora todas las peticiones dirigidas a:

```
/api
```

serán redireccionadas automáticamente a:

```
http://localhost:8080
```

eliminando las restricciones de **CORS**.

---

# Operaciones Implementadas

## Lectura Reactiva (GET)

La sección **Productos** consume la información mediante `httpResource`.

Características:

- Estado de carga ("Cargando...")
- Actualización reactiva
- Manejo visual de errores cuando el servidor no responde

---

## Creación de Productos (POST)

El formulario **Nuevo Producto** envía información mediante peticiones HTTP POST.

Al crear correctamente un registro:

- JSON Server genera automáticamente un ID.
- La interfaz muestra el mensaje:

```text
Creado con id [ID_GENERADO]
```

---

## Eliminación de Productos (DELETE)

Cada producto posee un botón **Eliminar**.

Después de una eliminación exitosa se ejecuta:

```ts
this.productos.reload()
```

permitiendo actualizar automáticamente la lista sin recargar la página.

---



# Tecnologías Utilizadas

- Angular 22
- TypeScript
- Signals
- httpResource
- JSON Server
- HTTP Client
- Proxy de Angular
- CSS (Flexbox y Grid)

---

# Objetivo de la Práctica

Implementar una aplicación Angular moderna capaz de consumir un servicio REST mediante operaciones **CRUD**, aplicando arquitectura reactiva con **Signals** y **httpResource**, además de resolver los problemas de **CORS** utilizando un **proxy de desarrollo**.