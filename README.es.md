# Proxy Local - Servidores de Desarrollo

*Lee esto en otros idiomas: [English](README.md)*

Este proyecto contiene dos servidores proxy diferentes para simular llamadas a sitios web con diferentes configuraciones de CORS y autenticación.

## 🚀 Servidores Disponibles

### 1. Servidor CORS Anywhere (`cors-proxy.js`)
Servidor proxy simple que desactiva las restricciones CORS para permitir llamadas cross-origin desde el navegador.

**Características:**
- Elimina restricciones CORS
- Remueve cookies automáticamente
- Permite todos los orígenes
- Basado en `cors-anywhere`

**Puerto:** 8081 (por defecto)

### 2. Servidor con Inyección de Cookies (`session-proxy.js`)
Servidor proxy avanzado que inyecta cookies de sesión en las peticiones para simular usuarios autenticados.

**Características:**
- Inyecta cookies desde archivo `cookies.txt`
- Simula headers de navegador real
- Mantiene contexto de sesión
- Maneja redirects y errores
- Endpoint de health check

**Puerto:** 8082 (por defecto)

## 📦 Instalación

```bash
# Instalar dependencias
npm install
# o
yarn install
```

## 🔧 Configuración

### Cookies para Sesión Autenticada
Para usar el servidor con inyección de cookies, crea o edita el archivo `cookies.txt` con las cookies de sesión:

```
session_id=abc123; auth_token=xyz789; user_pref=value
```

## 🚀 Uso

### Iniciar Servidor CORS Anywhere
```bash
npm start
# o
node cors-proxy.js
```

### Iniciar Servidor con Cookies
```bash
npm run start:session
# o
node session-proxy.js
```

### Iniciar Ambos Servidores
```bash
npm run start:both
# o
npm run dev
```

## 📡 Endpoints

### Servidor CORS Anywhere
```
GET/POST http://localhost:8081/[URL_DESTINO]
```

**Ejemplo:**
```javascript
fetch('http://localhost:8081/https://api.ejemplo.com/datos')
```

### Servidor con Cookies
```
GET/POST http://localhost:8082/proxy?url=[URL_DESTINO]
```

**Ejemplos:**
```javascript
// GET request
fetch('http://localhost:8082/proxy?url=https://sitio.com/api/datos')

// POST request con parámetros adicionales
fetch('http://localhost:8082/proxy?url=https://sitio.com/api/login&param1=value1')
```

**Health Check:**
```
GET http://localhost:8082/health
```

## 🛠️ Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | 8081 (CORS) / 8082 (Sesión) |
| `HOST` | Host del servidor | 0.0.0.0 |

## 📋 Casos de Uso

### Servidor CORS Anywhere
- Desarrollo frontend que necesita acceder a APIs externas
- Bypass de restricciones CORS durante desarrollo
- Testing de APIs públicas

### Servidor con Cookies
- Simular usuarios autenticados en sitios web
- Testing de funcionalidades que requieren sesión
- Scraping de contenido protegido
- Desarrollo con APIs que requieren autenticación por cookies

## 🔍 Logs y Debugging

El servidor con cookies muestra información útil en consola:
- URL de destino
- Cookies inyectadas (primeros 100 caracteres)
- Errores de proxy

## ⚠️ Consideraciones de Seguridad

- **Solo para desarrollo:** Estos servidores están diseñados para entornos de desarrollo
- **Cookies sensibles:** No commitear `cookies.txt` con datos reales
- **CORS abierto:** El servidor permite todos los orígenes por seguridad de desarrollo

## 📝 Estructura del Proyecto

```
proxy-local/
├── cors-proxy.js      # Servidor CORS Anywhere
├── session-proxy.js   # Servidor con inyección de cookies
├── cookies.txt        # Archivo de cookies (no commitear si contiene datos reales)
├── package.json       # Dependencias y scripts
└── README.md         # Este archivo
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request