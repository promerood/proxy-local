# Proxy Local - Development Servers

*Read this in other languages: [Español](README.es.md)*

This project contains two different proxy servers to simulate calls to websites with different CORS and authentication configurations.

## 🚀 Available Servers

### 1. CORS Anywhere Server (`cors-proxy.js`)
Simple proxy server that disables CORS restrictions to allow cross-origin calls from the browser.

**Features:**
- Removes CORS restrictions
- Automatically removes cookies
- Allows all origins
- Based on `cors-anywhere`

**Port:** 8081 (default)

### 2. Cookie Injection Server (`session-proxy.js`)
Advanced proxy server that injects session cookies into requests to simulate authenticated users.

**Features:**
- Injects cookies from `cookies.txt` file
- Simulates real browser headers
- Maintains session context
- Handles redirects and errors
- Health check endpoint

**Port:** 8082 (default)

## 📦 Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

## 🔧 Configuration

### Cookies for Authenticated Session
To use the server with cookie injection, create or edit the `cookies.txt` file with session cookies:

```
session_id=abc123; auth_token=xyz789; user_pref=value
```

## 🚀 Usage

### Start CORS Anywhere Server
```bash
npm start
# or
node cors-proxy.js
```

### Start Cookie Injection Server
```bash
npm run start:session
# or
node session-proxy.js
```

### Start Both Servers
```bash
npm run start:both
# or
npm run dev
```

## 📡 Endpoints

### CORS Anywhere Server
```
GET/POST http://localhost:8081/[TARGET_URL]
```

**Example:**
```javascript
fetch('http://localhost:8081/https://api.example.com/data')
```

### Cookie Injection Server
```
GET/POST http://localhost:8082/proxy?url=[TARGET_URL]
```

**Examples:**
```javascript
// GET request
fetch('http://localhost:8082/proxy?url=https://site.com/api/data')

// POST request with additional parameters
fetch('http://localhost:8082/proxy?url=https://site.com/api/login&param1=value1')
```

**Health Check:**
```
GET http://localhost:8082/health
```

## 🛠️ Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `PORT` | Server port | 8081 (CORS) / 8082 (Session) |
| `HOST` | Server host | 0.0.0.0 |

## 📋 Use Cases

### CORS Anywhere Server
- Frontend development that needs to access external APIs
- Bypass CORS restrictions during development
- Testing public APIs

### Cookie Injection Server
- Simulate authenticated users on websites
- Testing functionalities that require session
- Scraping protected content
- Development with APIs that require cookie authentication

## 🔍 Logs and Debugging

The cookie injection server shows useful information in console:
- Target URL
- Injected cookies (first 100 characters)
- Proxy errors

## ⚠️ Security Considerations

- **Development only:** These servers are designed for development environments
- **Sensitive cookies:** Do not commit `cookies.txt` with real data
- **Open CORS:** The server allows all origins for development security

## 📝 Project Structure

```
proxy-local/
├── cors-proxy.js      # CORS Anywhere Server
├── session-proxy.js   # Cookie injection server
├── cookies.txt        # Cookie file (do not commit if contains real data)
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request