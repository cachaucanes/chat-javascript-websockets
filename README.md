# 💬 Chat en Tiempo Real con WebSockets

Aplicación web de chat en tiempo real construida con **Node.js**, **Express**, **Socket.IO** y **MongoDB**, ejecutándose en contenedores con **Docker**.

---

## 🚀 Tecnologías utilizadas

* Node.js
* Express
* Socket.IO
* MongoDB
* Docker & Docker Compose

---

## 📸 Vista previa

![chat Javascript](https://user-images.githubusercontent.com/29615549/62894430-4cf9a180-bd12-11e9-819d-90f0c4924c48.jpg)

---

## 🧠 Características

* Comunicación en tiempo real con WebSockets
* Persistencia de mensajes en MongoDB
* Arquitectura backend con Express
* Frontend estático servido desde el backend
* Entorno dockerizado (sin instalaciones locales)
* Recarga automática en desarrollo con Nodemon

---

## 📦 Instalación y ejecución

### 🔧 Requisitos

* Docker
* Docker Compose

---

### ▶️ Ejecutar el proyecto

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
docker-compose up --build
```

---

## 🌐 Acceso

Abre en tu navegador:

```text
http://localhost:3000
```

---

## ⚙️ Variables de entorno

Archivo `.env`:

```env
MONGO_URI=mongodb://mongo:27017/chat-database
PORT=3000
```

---

## 🐳 Arquitectura Docker

El proyecto corre con dos servicios:

* **app** → Servidor Node.js
* **mongo** → Base de datos MongoDB

Conexión interna:

```text
mongodb://mongo:27017/chat-database
```

---

## 📁 Estructura del proyecto

```bash
.
├── src/
│   ├── index.js        # Punto de entrada del servidor
│   ├── sockets.js      # Lógica de WebSockets
│   ├── models/
│   │   └── chat.js     # Modelo de datos (MongoDB)
│   └── public/
│       ├── index.html  # Interfaz del chat
│       ├── css/
│       │   └── main.css
│       └── js/
│           └── main.js # Lógica del cliente
│
├── Dockerfile
├── docker-compose.yml
├── .env
├── .dockerignore
├── package.json
└── README.md
```

---

## 🧪 Scripts disponibles

```bash
npm run dev   # desarrollo con nodemon
npm start     # producción
```

---

## 🔌 Funcionamiento general

1. El cliente se conecta vía WebSockets usando Socket.IO
2. El servidor recibe y emite eventos en tiempo real
3. Los mensajes se almacenan en MongoDB
4. Todos los clientes conectados reciben actualizaciones instantáneamente

---

## ⚠️ Notas importantes

* No necesitas instalar MongoDB localmente
* No hay problemas de red entre WSL y Windows (Docker lo gestiona)
* Compatible con Windows, Linux y Mac

---

## 🚀 Mejoras futuras

* Autenticación de usuarios
* Salas de chat
* Indicador "usuario escribiendo..."
* Persistencia avanzada (historial por usuario)
* Frontend en React
* Deploy en producción

---

## 👨‍💻 Autor

Proyecto desarrollado como práctica de WebSockets, backend en Node.js y entornos dockerizados.

---

## 📄 Licencia

ISC
