# 🏠 Acortador de Enlaces — Backend de Acortador de URLs

**Acortador de Enlaces** es un **backend modular y escalable** para acortar URLs.  
Incluye creación de enlaces cortos, redirección automática, rastreo de clics, caching con Redis y persistencia en MySQL.

---

## 🧩 Arquitectura del Proyecto

```bash
📦 Acortador-de-Enlaces
├── main.ts                     # Punto de entrada principal del servidor NestJS
├── app.module.ts               # Módulo raíz de la aplicación
├── package.json                # Dependencias y scripts del proyecto
├── package-lock.json
├── README.md
│
├── 🧠 controllers/             # Controladores para manejar rutas y lógica de negocio
│   ├── shortener.controller.ts     # CRUD de URLs cortas
│   └── redirect.controller.ts      # Redirección y top URLs
│
├── 🗄️ databases/               # Conexiones a bases de datos y servicios de caché
│   ├── redis/                       # Módulo Redis para caching
│   │   ├── redis.constants.ts
│   │   ├── redis.module.ts
│   │   └── redis.service.ts
│   └── (Sequelize en app.module.ts) # Configuración MySQL
│
├── 🧱 middlewares/             # Middlewares para validaciones y seguridad (integrados en pipes)
│   └── pipes/                       # Pipes personalizados
│       └── shortener.pipe.ts        # Validación con Zod
│
├── 🧬 models/                  # Definición de entidades y relaciones
│   └── entities/                    # Entidades Sequelize
│       └── shortener.entity.ts      # Modelo UrlData
│
├── 🧭 modules/                 # Módulos organizados por dominio funcional
│   ├── shortener.module.ts          # Módulo para acortar URLs
│   ├── redirect.module.ts           # Módulo para redirecciones
│   └── redis.module.ts              # Módulo global de Redis
│
├── ⚙️ services/                # Servicios para lógica de negocio y externos
│   ├── shortener.service.ts         # Lógica de creación de URLs cortas
│   ├── redirect.service.ts          # Lógica de redirección y clics
│   ├── shortener.repository.ts      # Acceso a datos para shortener
│   └── redirect.repository.ts       # Acceso a datos para redirect
│
├── ✅ validations/             # Validaciones centralizadas con Zod
│   ├── dto/                         # DTOs para requests/responses
│   │   ├── create-shortener.dto.ts
│   │   └── response-shortener.dto.ts
│   └── pipes/                       # Pipes de validación
│       └── shortener.pipe.ts
│
└── 🧪 tests/                   # Tests end-to-end
    ├── app.e2e-spec.ts
    └── jest-e2e.json
```

---

## ⚙️ Tecnologías Principales

| Tipo | Tecnología |
|------|-------------|
| **Framework** | NestJS (Node.js) |
| **Lenguaje** | TypeScript |
| **Base de Datos** | MySQL (Sequelize ORM) |
| **Cache** | Redis |
| **Validación** | Zod |
| **Generación de Códigos** | Hashids |
| **Testing** | Jest |
| **Linting/Formatting** | ESLint + Prettier |

---

## 🚀 Características Principales

### 🔗 Acortamiento de URLs
- Creación de URLs cortas únicas usando Hashids.
- Validación de URLs con Zod.
- Almacenamiento en MySQL con sincronización automática.

### ↩️ Redirección
- Redirección automática a la URL original.
- Incremento del contador de clics.
- Manejo de errores para URLs inválidas o expiradas.

### 📊 Rastreo de Clics
- Conteo de clics por URL.
- Endpoint para obtener el top 3 de URLs más clicadas.

### 🧠 Caching
- Cache de URLs en Redis por 1 hora para mejorar rendimiento.
- Cache del top de URLs.
- Invalidación automática al actualizar datos.

### 🔒 Rate Limiting
- Límite global: 10 solicitudes por minuto.
- Creación de URLs cortas: 3 solicitudes por minuto.
- Storage en Redis para escalabilidad.

### 🛡️ Validación y Seguridad
- Pipes personalizados con Zod para validación de entrada.
- Manejo de errores centralizado.

---

## 🧠 Flujo General del Sistema

```mermaid
graph TD
A[Usuario envía URL larga] --> B[Validación con Zod]
B --> C[Generar código corto con Hashids]
C --> D[Guardar en MySQL]
D --> E[Cachear en Redis]
E --> F[Retornar URL corta]
G[Usuario accede a URL corta] --> H[Buscar en Redis]
H --> I{Encontrada?}
I -->|Sí| J[Redirigir + Incrementar clics]
I -->|No| K[Buscar en MySQL]
K --> L[Cachear y redirigir]
```

---

## 🧰 Instalación y Configuración

```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/Angelitoo777/Acortador-de-Enlaces.git
cd Acortador-de-Enlaces

# 2️⃣ Instala dependencias
npm install

# 3️⃣ Configura variables de entorno
cp .env.example .env  # Crea .env con las siguientes variables

# 4️⃣ Levanta servicios externos (MySQL, Redis)
# Asegúrate de tener MySQL y Redis corriendo localmente

# 5️⃣ Inicia el servidor
npm run start:dev
```

### 🧾 Variables de entorno requeridas

```env
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/nombre_db
HASHIDS_SALTS=tu_salt_secreto_para_hashids
PORT=3000
```

---

## 🧪 Endpoints principales

| Método | Endpoint | Descripción |
|--------|-----------|--------------|
| `POST` | `/shortener` | Crea una URL corta |
| `GET` | `/shortener` | Lista todas las URLs (debug) |
| `GET` | `/redirect/:shortUrl` | Redirige a la URL original |
| `GET` | `/top` | Obtiene el top 3 de URLs más clicadas |

---

## 🧩 Ejemplo de Flujo

1. Usuario envía una URL larga (`POST /shortener`).  
2. El backend valida la URL con Zod.  
3. Genera un código corto único con Hashids.  
4. Guarda en MySQL y cachea en Redis.  
5. Retorna la URL corta.  
6. Al acceder a la URL corta (`GET /redirect/abc1234`):  
   - Busca en Redis primero.  
   - Si no, en MySQL.  
   - Redirige e incrementa clics.  
7. El endpoint `/top` muestra las más populares.

---

## 👨‍💻 Autor

**Desarrollador:** Angel Oropeza  
**Rol:** Backend Developer  
**Stack:** NestJS, TypeScript, MySQL, Redis, Zod  
**Proyecto:** Acortador de Enlaces — Servicio de Acortamiento Inteligente 🧠