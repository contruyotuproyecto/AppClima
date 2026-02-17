# Weather App ☁️

Una aplicación web de clima moderna, responsive y con tema claro/oscuro, desarrollada con HTML5, CSS3 y JavaScript vanilla.

## 🌟 Características

* ✅ Búsqueda de clima por ciudad
* ✅ Muestra clima actual con datos detallados
* ✅ Pronóstico de 5 días
* ✅ Tema claro/oscuro (Dark Mode)
* ✅ Cambio entre Celsius y Fahrenheit
* ✅ Diseño completamente responsive
* ✅ Interfaz moderna y atractiva
* ✅ Geolocalización automática (opcional)
* ✅ Datos en tiempo real de OpenWeather API

## 🛠️ Tecnologías Utilizadas

* **HTML5** - Estructura semántica
* **CSS3** - Diseño responsive con Grid y Flexbox
* **JavaScript (Vanilla)** - Lógica y API integration
* **OpenWeather API** - Datos del clima
* **Font Awesome 6** - Iconografía

## 🚀 Instalación y Uso

### 1. Clonar o descargar el proyecto

```bash
git clone https://github.com/pausherl/weather-app.git
cd weather-app
```

### 2. Obtener API Key

1. Ve a https://openweathermap.org/api
2. Regístrate (gratis, sin tarjeta de crédito)
3. Copia tu **Default API Key**

### 3. Configurar API Key

Abre el archivo `js/script.js` y reemplaza:

```javascript
const API_KEY = 'TU_API_KEY_AQUI';
```

por tu API key:

```javascript
const API_KEY = 'abc123def456...'
```

### 4. Ejecutar la aplicación

Opción A: Abrir directamente

```bash
# Simplemente abre index.html en tu navegador
open index.html
```

Opción B: Usar un servidor local (recomendado)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
http-server

# Luego abre: http://localhost:8000
```

## 📱 Responsive Design

La aplicación se adapta perfectamente a:

* 🖥️ **Desktops** (1200px+)
* 💻 **Tablets** (768px - 1199px)
* 📱 **Móviles** (320px - 767px)

## 🎨 Temas

### Modo Claro (Por defecto)

* Fondo blanco limpio
* Texto oscuro legible
* Colores acento azules

### Modo Oscuro

* Fondo oscuro elegante
* Texto claro
* Colores acento ajustados

El tema se guarda automáticamente en `localStorage`.

## 🔍 Cómo Funciona

### Búsqueda de Ciudad

```javascript
// El usuario ingresa una ciudad y presiona Enter o clic
fetchCurrentWeather('San José, Costa Rica')
```

La app obtiene:

1. **Clima Actual** - Temperatura, humedad, viento, etc.
2. **Pronóstico 5 días** - Temperatura mín/máx por día
3. **Datos detallados** - Visibilidad, presión, nubosidad, amanecer/atardecer

### Cambio de Unidades

```javascript
// Celsius (por defecto)
currentUnit = 'metric'

// Fahrenheit
currentUnit = 'imperial'
```

### Dark Mode

Se guarda en `localStorage` para persistencia entre sesiones:

```javascript
localStorage.setItem('theme', isDark ? 'dark' : 'light');
```

## 📁 Estructura del Proyecto

```
weather-app/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos responsive + dark mode
├── js/
│   └── script.js       # Lógica y API integration
├── assets/             # Imágenes/iconos (si los necesitas)
├── README.md           # Este archivo
├── .gitignore          # Archivos ignorados en Git
└── LICENSE             # Licencia (opcional)
```

## 🔧 Variables de CSS

Las variables CSS permiten cambios globales fáciles:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent-color: #3498db;
    --transition: all 0.3s ease;
}

/* Dark Mode */
body.dark-theme {
    --bg-primary: #1a1a1a;
    --text-primary: #ffffff;
    /* ... etc */
}
```

## 🌐 API Endpoints Utilizados

### Clima Actual

```
GET /weather?q={city}&appid={API_KEY}&units={units}&lang=es
```

### Pronóstico 5 días

```
GET /forecast?lat={lat}&lon={lon}&appid={API_KEY}&units={units}&lang=es
```

**Unidades:**

* `metric` → Celsius, m/s
* `imperial` → Fahrenheit, mph

## ⚡ Mejoras Futuras

* [ ] Búsqueda de historial
* [ ] Guardar ciudades favoritas
* [ ] Notificaciones de alertas de clima
* [ ] Mapa interactivo
* [ ] Radar de lluvia
* [ ] App offline con Service Workers
* [ ] Progressive Web App (PWA)
* [ ] Gráficos de temperatura por hora

## 🐛 Solución de Problemas

### Error: "Ciudad no encontrada"

* Verifica la ortografía del nombre de la ciudad
* Intenta con formato: "Ciudad, País" (ej: "San José, Costa Rica")

### Error: "API Key inválida"

* Confirma que copiaste correctamente tu API key
* Verifica en https://openweathermap.org/api/key

### No aparece el clima

* Abre la consola del navegador (F12) para ver errores
* Verifica tu conexión a internet

## 📄 Licencia

Este proyecto está disponible bajo la licencia MIT.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:

1. Fork el proyecto
2. Crear una rama (`git checkout -b feature/MejorFeature`)
3. Commit tus cambios (`git commit -m 'Agrega MejorFeature'`)
4. Push a la rama (`git push origin feature/MejorFeature`)
5. Abrir un Pull Request

## 👨‍💻 Autor

Desarrollado como proyecto educativo para aprender JavaScript, API REST, y diseño responsivo.

## 🙏 Agradecimientos

* [OpenWeather](https://openweathermap.org/) por la API de clima
* [Font Awesome](https://fontawesome.com/) por los iconos
* La comunidad de desarrolladores

---

**¿Te gustó este proyecto?** Dale una ⭐ en GitHub!

Para más información, visita la [documentación de OpenWeather](https://openweathermap.org/api).
