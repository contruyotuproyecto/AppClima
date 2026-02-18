# 🌤️ ClimaApp — Paulo Jimenez

![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-deployed-brightgreen?logo=github&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![OpenWeather](https://img.shields.io/badge/OpenWeather-API-orange)

Aplicación web de clima en tiempo real con diseño **glassmorphism**, fondo animado dinámico según las condiciones del tiempo, mapa interactivo, gráfica de temperatura y sistema de alertas para condiciones extremas.

---

## 🚀 Demo

👉 [Ver demo en vivo](https://contruyotuproyecto.github.io/AppClima/)

---

## 📸 Vista previa

> Diseño oscuro con glassmorphism, fondo animado (lluvia, nieve, tormenta, sol), mapa Leaflet y gráfica Chart.js integrados.

---

## ✨ Características

### 🎨 Visual
- **Fondo animado dinámico** — cambia automáticamente según el clima:
  - ☀️ Sol → estrellas parpadeantes
  - 🌧️ Lluvia → gotas cayendo animadas
  - ⛈️ Tormenta → gotas + destellos de relámpago
  - ❄️ Nieve → copos flotantes
  - ☁️ Nublado → nubes deslizándose
- **Glassmorphism** — cards con fondo translúcido y backdrop blur
- **Color de acento dinámico** — cambia según el tipo de clima detectado
- **Ícono del clima flotante** — animación suave de levitación
- **Tipografía** — Syne (display) + DM Sans (cuerpo)

### 🔍 Búsqueda
- **Autocompletado inteligente** con más de 80 ciudades populares
- **Lista amplia de Costa Rica** — Gran Área Metropolitana, Guanacaste, Pacífico, Caribe, Zona Norte, Occidente
- **Historial de búsquedas** — guarda las últimas 6 ciudades en localStorage, con opción de eliminar cada una
- **Geolocalización automática** — detecta tu ubicación al cargar la página con botón dedicado en el header
- **Errores inteligentes** — cuando falla una búsqueda muestra sugerencias de ciudades similares con botones clicables

### 📊 Datos del clima
- Temperatura actual, sensación térmica, mín/máx
- Humedad, viento, visibilidad, presión, nubosidad
- Hora de amanecer y atardecer
- **Gráfica de temperatura próximas 24h** — temperatura real + sensación térmica con Chart.js
- **Mapa interactivo Leaflet** — ubicación exacta de la ciudad con marcador animado
- **Pronóstico de 5 días**
- **⚠️ Alertas de clima extremo** — detecta automáticamente:
  - Temperatura muy alta o bajo cero
  - Vientos fuertes (> 20 m/s)
  - Tormentas eléctricas activas
  - Humedad extrema (> 90%)

### 📱 Responsive
- Adaptado para móvil, tablet y escritorio
- En móvil el filtro de unidad se posiciona debajo del logo
- Gráfica y mapa apilados en pantallas menores a 860px
- Pronóstico compacto en pantallas pequeñas

---

## 🗂️ Estructura del proyecto

```
AppClima/
├── assets/
│   └── jpdev.jpeg          # Logo del desarrollador
├── README.md
└── index.html              # App completa (HTML + CSS + JS en un solo archivo)
```

> La versión 3 consolidó todo en un único `index.html` para simplificar el mantenimiento y el despliegue.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 + CSS3 + JS Vanilla | Base de la aplicación |
| [OpenWeather API](https://openweathermap.org/api) | Datos de clima en tiempo real |
| [Chart.js 4.4](https://www.chartjs.org/) | Gráfica de temperatura |
| [Leaflet 1.9](https://leafletjs.com/) | Mapa interactivo |
| [Font Awesome 6.4](https://fontawesome.com/) | Iconografía |
| [Google Fonts](https://fonts.google.com/) | Syne + DM Sans |
| Canvas API | Animación de fondo dinámica |
| localStorage | Historial de búsquedas y preferencias |

---

## ⚙️ Instalación y uso local

```bash
# Clonar el repositorio
git clone https://github.com/contruyotuproyecto/AppClima.git
cd AppClima

# Abrir directamente en el navegador
open index.html
# o simplemente arrastra el archivo index.html a tu navegador
```

> No requiere servidor ni dependencias npm. Es una app 100% frontend estática.

---

## 🔑 API Key

La app usa la API gratuita de [OpenWeather](https://openweathermap.org/api). La key está ofuscada en el código mediante fragmentos codificados en base64.

Para usar tu propia key reemplaza el array `_k` en el `index.html`:

```js
// Reemplaza con tu propia API key de openweathermap.org
const _k = 'TU_API_KEY_AQUI';
```

> Para mayor seguridad en producción se recomienda usar un backend como proxy que maneje la key del lado del servidor.

---

## 📦 Historial de versiones

| Versión | Cambios |
|---|---|
| v3.0 | Rediseño completo: glassmorphism, fondo animado, Chart.js, Leaflet, alertas extremas, historial |
| v2.0 | Autocompletado, ciudades CR ampliadas, errores inteligentes con sugerencias, API key ofuscada |
| v1.0 | Versión inicial: búsqueda de ciudades, pronóstico 5 días, modo oscuro/claro, geolocalización |

---

## 👨‍💻 Autor

**Paulo Jimenez** — Desarrollador Web Full Stack

- 🌐 [ConstruyeTuWeb.com](https://construyetuweb.com)
- 💻 [GitHub @contruyotuproyecto](https://github.com/contruyotuproyecto)
- 💬 [WhatsApp](https://walink.co/b4a464)

---

## 📄 Licencia

MIT — libre para usar, modificar y distribuir con atribución al autor.
