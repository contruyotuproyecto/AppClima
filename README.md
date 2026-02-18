# 🌤️ ClimaApp — Paulo Jimenez

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-brightgreen?logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-API-orange)
![Google News](https://img.shields.io/badge/Google%20News-RSS-4285F4?logo=googlenews&logoColor=white)

Aplicación web de clima en tiempo real con diseño **glassmorphism**, fondo animado dinámico, mapa interactivo, gráfica de temperatura, alertas de condiciones extremas y **noticias climáticas de las últimas 24 horas** según la ubicación buscada.

---

## 🚀 Demo

👉 [Ver demo en vivo](https://contruyotuproyecto.github.io/AppClima/)

---

## ✨ Características

### 🎨 Visual
- **Fondo animado dinámico** en canvas — cambia automáticamente según el clima:
  - ☀️ Sol → estrellas parpadeantes
  - 🌧️ Lluvia → gotas cayendo animadas
  - ⛈️ Tormenta → gotas + destellos de relámpago
  - ❄️ Nieve → copos flotantes
  - ☁️ Nublado → nubes deslizándose
- **Glassmorphism** — cards con fondo translúcido y backdrop blur
- **Color de acento dinámico** — cambia según el tipo de clima detectado
- **Ícono del clima flotante** — animación suave de levitación
- **Header sticky** — se mantiene visible al hacer scroll con fondo semitransparente
- **Tipografía** — Syne (display) + DM Sans (cuerpo)

### 🔍 Búsqueda
- **Autocompletado inteligente** con más de 80 ciudades populares
- **Lista amplia de Costa Rica** — GAM, Guanacaste, Pacífico, Caribe, Zona Norte, Occidente
- **Historial de búsquedas** — guarda las últimas 6 ciudades con opción de eliminar
- **Geolocalización automática** — detecta ubicación al cargar y con botón dedicado en el header
- **Errores inteligentes** — muestra sugerencias de ciudades similares con chips clicables
- **Z-index corregido** — autocompletado siempre visible sobre cualquier elemento

### 📊 Datos del clima
- Temperatura actual, sensación térmica, mín/máx
- Humedad, viento, visibilidad, presión, nubosidad
- Hora de amanecer y atardecer
- **Gráfica de temperatura próximas 24h** — temperatura real + sensación térmica (Chart.js)
- **Mapa interactivo** — ubicación exacta con marcador animado (Leaflet + OpenStreetMap)
- **Pronóstico de 5 días** — con scroll horizontal en móvil, sin ocultar días

### ⚠️ Alertas de clima extremo
Detecta y notifica automáticamente condiciones peligrosas. Funciona igual en °C y °F gracias a conversión interna a Celsius antes de comparar:

| Condición | Umbral |
|---|---|
| 🌡️ Calor extremo | > 38°C / 100°F |
| 🧊 Heladas | < 0°C / 32°F |
| 💨 Vientos fuertes | > 15 m/s (54 km/h / 33 mph) |
| ⚡ Tormenta eléctrica | Weather ID 200–299 |
| 🌀 Condición extrema | Weather ID 900–909 |
| 💧 Humedad extrema | > 95% |

> El viento se convierte siempre a m/s antes de comparar ya que OpenWeather devuelve `wind.speed` en mph cuando la unidad es imperial.

### 📰 Noticias climáticas — últimas 24h
- Se cargan automáticamente al buscar cualquier ciudad
- Busca primero noticias específicas de la ciudad, luego del país como fallback
- Usa el operador `after:YYYY-MM-DD` nativo de Google News para filtrar por fecha real (no por palabras clave)
- Cache busting con `nocache=<timestamp>` en la URL del RSS para evitar resultados cacheados
- Artículos ordenados de más reciente a más antiguo
- Badge **RECIENTE** en artículos de menos de 24h
- Fuente: Google News RSS + rss2json.com (sin API key, gratis)
- Compatible con países hispanohablantes (español) y resto del mundo (inglés)

### 📱 Responsive
- Header apila verticalmente en móvil: logo arriba, selector de unidad abajo
- Gráfica y mapa en columna en pantallas < 860px
- Pronóstico con scroll horizontal en móvil (5 días siempre visibles)
- Stats y details en grid 2 columnas en móvil

---

## 🗂️ Estructura del proyecto

```
AppClima/
├── assets/
│   └── jpdev.jpeg          # Logo del desarrollador
├── README.md
└── index.html              # App completa (HTML + CSS + JS en un solo archivo)
```

> Todo consolidado en un único `index.html` — sin dependencias npm, sin build tools, listo para GitHub Pages.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 + CSS3 + JS Vanilla | Base completa de la aplicación |
| [OpenWeather API v2.5](https://openweathermap.org/api) | Clima actual y pronóstico 5 días |
| [Chart.js 4.4](https://www.chartjs.org/) | Gráfica de temperatura 24h |
| [Leaflet 1.9](https://leafletjs.com/) | Mapa interactivo con marcador |
| [Google News RSS](https://news.google.com) | Feed de noticias por ubicación |
| [rss2json.com](https://rss2json.com) | Conversión RSS → JSON sin API key |
| [Font Awesome 6.4](https://fontawesome.com/) | Iconografía |
| [Google Fonts](https://fonts.google.com/) | Syne + DM Sans |
| Canvas API | Animación de fondo dinámica |
| localStorage | Historial de búsquedas |

---

## ⚙️ Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/contruyotuproyecto/AppClima.git
cd AppClima

# Abrir en el navegador (sin servidor requerido)
open index.html
```

> App 100% estática. No requiere Node.js, npm ni ningún servidor.

---

## 🔑 API Key

La key de OpenWeather está ofuscada en el código mediante fragmentos en base64. Para usar la tuya propia, busca el array `_k` en `index.html` y reemplázalo:

```js
// Busca esta sección en index.html y reemplaza con tu key de openweathermap.org
const _k = 'TU_API_KEY_AQUI';
```

> Para mayor seguridad en producción, se recomienda un backend proxy que maneje la key del lado del servidor.

---

## 📦 Historial de versiones

| Versión | Cambios |
|---|---|
| v3.4 | Noticias climáticas 24h con operador `after:`, cache busting, badge RECIENTE, filtro por relevancia geográfica |
| v3.3 | Alertas unificadas °C/°F con conversión interna, corrección wind.speed imperial, ícono doble eliminado |
| v3.2 | Autocomplete z-index corregido, pronóstico 5 días siempre visible con scroll horizontal en móvil |
| v3.1 | Header sticky, responsive completo, gráfica y mapa con `min-width:0` para evitar desbordamiento |
| v3.0 | Rediseño completo: glassmorphism, fondo animado canvas, Chart.js, Leaflet, alertas extremas, historial |
| v2.0 | Autocompletado 80+ ciudades, errores inteligentes con sugerencias, API key ofuscada en base64 |
| v1.0 | Versión inicial: búsqueda, pronóstico 5 días, geolocalización |

---

## 👨‍💻 Autor

**Paulo Jimenez** — Desarrollador Web Full Stack

- 🌐 [ConstruyeTuWeb.com](https://construyetuweb.com)
- 💻 [GitHub @contruyotuproyecto](https://github.com/contruyotuproyecto)
- 💬 [WhatsApp](https://walink.co/b4a464)

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir con atribución al autor.
