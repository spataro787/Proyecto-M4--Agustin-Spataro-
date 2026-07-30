# 📋 Gestor Estratégico - Proyecto M4

## 📖 Descripción

**Gestor Estratégico** es una aplicación web desarrollada como Proyecto M4, cuyo objetivo es permitir a los usuarios gestionar sus tareas diarias de manera simple, organizada y segura.

Cada usuario puede registrarse, iniciar sesión y administrar sus propias tareas mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar). La información se almacena en Firebase, permitiendo acceder desde cualquier dispositivo con conexión a Internet.

Como funcionalidad adicional, la aplicación incorpora el envío de un resumen de tareas por correo electrónico utilizando Amazon SES.

---

## 🚀 Tecnologías utilizadas

### Frontend

* React
* TypeScript
* Vite
* React Router DOM
* CSS3

### Backend / Servicios

* Firebase Authentication
* Firebase Firestore
* Amazon SES
* Vercel Serverless Functions

### Testing

* Vitest
* React Testing Library

### Despliegue

* Vercel

---

## ✨ Funcionalidades

* Registro de usuarios.
* Inicio de sesión con correo y contraseña.
* Inicio de sesión con Google.
* Persistencia de sesión.
* Rutas protegidas.
* CRUD completo de tareas.
* Persistencia de datos en Firebase Firestore.
* Interfaz moderna y responsive.
* Envío de resumen de tareas por correo electrónico mediante Amazon SES.
* Manejo de estados de carga y errores.

---

## 📁 Estructura del proyecto

```text
src/
 ├── components/
 ├── features/
 │    ├── auth/
 │    └── tasks/
 ├── hooks/
 ├── pages/
 ├── routes/
 ├── services/
 ├── types/
 └── main.tsx

api/
 └── send-summary.ts
```

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Ingresar al proyecto:

```bash
cd proyecto-m4
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

---

## 🔐 Variables de entorno

Crear un archivo `.env` con las siguientes variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_SES_SENDER_EMAIL=
```

---

## 🧪 Tests

Ejecutar:

```bash
npm test
```

---

## 🌐 Deploy

Proyecto desplegado en Vercel.

**Deploy:**https://proyecto-m4-agustin-spataro-rwdm.vercel.app/

---

## 📷 Capturas

Se recomienda agregar imágenes de:

* Login
* Registro
* Lista de tareas
* Nueva tarea
* Resumen enviado

---

## 👨‍💻 Autor

**Agustín Spataro**

Proyecto realizado para la formación como Desarrollador Full Stack.

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó inteligencia artificial como herramienta de apoyo para comprender tecnologías, resolver dudas y mejorar la calidad del código.

La IA fue utilizada para:

* Comprender conceptos de React y TypeScript.
* Resolver errores de compilación y configuración.
* Integrar Amazon SES para el envío de correos electrónicos.
* Mejorar la organización del código y la arquitectura del proyecto.
* Optimizar componentes React.
* Elaborar la documentación del proyecto (README).

La inteligencia artificial fue utilizada únicamente como herramienta de asistencia. Todas las decisiones finales sobre la implementación, estructura del proyecto, integración de servicios y resolución de problemas fueron analizadas, comprendidas e implementadas por el desarrollador.

---

## 📄 Licencia

Proyecto desarrollado únicamente con fines educativos.
