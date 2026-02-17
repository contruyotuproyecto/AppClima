// ==================== CONFIGURACIÓN ====================

// API key ofuscada (dividida y codificada para no exponerla en texto plano)
// Para producción real, usa un backend o variable de entorno
const _k = [
    atob('NjhmZGZk'),
    atob('NTdiZmU0M2I4OTA='),
    atob('MDcwZDAyN2Rj'),
    atob('ODk4OTQ1')
].join('');
const API_BASE_URL = atob('aHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41');

// ==================== CIUDADES POPULARES (autocompletado) ====================

const POPULAR_CITIES = [
    // Costa Rica - Gran Área Metropolitana
    "San José, CR", "Alajuela, CR", "Cartago, CR", "Heredia, CR",
    "Desamparados, CR", "San Vicente de Moravia, CR", "Goicoechea, CR",
    "Santa Ana, CR", "Escazú, CR", "Belén, CR", "Flores, CR",
    "San Pablo, CR", "Barva, CR", "Santo Domingo, CR", "Santa Bárbara, CR",
    "San Isidro de Heredia, CR", "Paraíso, CR", "La Unión, CR",
    // Costa Rica - Zona Norte y Caribe
    "San Carlos, CR", "Ciudad Quesada, CR", "Guápiles, CR", "Limón, CR",
    "Siquirres, CR", "Turrialba, CR", "Pococí, CR",
    // Costa Rica - Pacífico Central y Sur
    "Puntarenas, CR", "Quepos, CR", "Jacó, CR", "San Isidro, CR",
    "Pérez Zeledón, CR", "Palmar Norte, CR", "Golfito, CR", "Osa, CR",
    // Costa Rica - Guanacaste y Pacífico Norte
    "Liberia, CR", "Nicoya, CR", "Santa Cruz, CR", "Nosara, CR",
    "Tamarindo, CR", "Cañas, CR", "La Cruz, CR", "Bagaces, CR",
    // Costa Rica - Zona Occidente
    "Grecia, CR", "Naranjo, CR", "Zarcero, CR", "Palmares, CR",
    "Atenas, CR", "Puriscal, CR", "San Ramón, CR", "Orotina, CR",
    // Latinoamérica
    "Ciudad de México, MX", "Guadalajara, MX", "Monterrey, MX",
    "Buenos Aires, AR", "Córdoba, AR", "Rosario, AR",
    "São Paulo, BR", "Rio de Janeiro, BR", "Brasilia, BR",
    "Santiago, CL", "Valparaíso, CL",
    "Bogotá, CO", "Medellín, CO", "Cali, CO", "Barranquilla, CO",
    "Lima, PE", "Arequipa, PE",
    "Caracas, VE", "Maracaibo, VE",
    "Quito, EC", "Guayaquil, EC",
    "La Paz, BO", "Santa Cruz de la Sierra, BO",
    "Asunción, PY", "Montevideo, UY",
    "Ciudad de Panamá, PA", "San Salvador, SV",
    "Tegucigalpa, HN", "Managua, NI", "Guatemala City, GT",
    "Santo Domingo, DO", "Havana, CU",
    // España
    "Madrid, ES", "Barcelona, ES", "Sevilla, ES", "Valencia, ES",
    "Bilbao, ES", "Málaga, ES", "Zaragoza, ES",
    // Estados Unidos
    "New York, US", "Los Angeles, US", "Chicago, US", "Miami, US",
    "Houston, US", "Dallas, US", "Phoenix, US",
    "San Francisco, US", "Seattle, US", "Denver, US", "Boston, US",
    "Las Vegas, US", "Atlanta, US", "Orlando, US",
    // Europa
    "London, GB", "Paris, FR", "Berlin, DE", "Rome, IT",
    "Amsterdam, NL", "Lisbon, PT", "Vienna, AT",
    "Stockholm, SE", "Oslo, NO", "Copenhagen, DK",
    "Warsaw, PL", "Prague, CZ", "Budapest, HU",
    // Asia y Otros
    "Tokyo, JP", "Beijing, CN", "Shanghai, CN", "Seoul, KR",
    "Dubai, AE", "Mumbai, IN", "Bangkok, TH", "Singapore, SG",
    "Sydney, AU", "Melbourne, AU", "Toronto, CA", "Vancouver, CA",
    "Cairo, EG", "Lagos, NG", "Nairobi, KE", "Johannesburg, ZA"
];

// ==================== ELEMENTOS DEL DOM ====================

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const themeToggle = document.getElementById('themeToggle');
const unitSelect = document.getElementById('unitSelect');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastSectionDiv = document.getElementById('forecastSection');
const forecastContainer = document.getElementById('forecastContainer');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const autocompleteList = document.getElementById('autocompleteList');

// ==================== VARIABLES GLOBALES ====================

let currentUnit = 'metric';
let currentWeatherData = null;
let forecastData = null;
let autocompleteTimeout = null;

// ==================== AUTOCOMPLETADO ====================

function showAutocompleteSuggestions(query) {
    clearTimeout(autocompleteTimeout);
    if (query.length < 2) {
        autocompleteList.style.display = 'none';
        return;
    }
    autocompleteTimeout = setTimeout(() => {
        const norm = q => q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const matches = POPULAR_CITIES.filter(city => norm(city).includes(norm(query))).slice(0, 8);
        if (matches.length === 0) {
            autocompleteList.style.display = 'none';
            return;
        }
        autocompleteList.innerHTML = matches.map(city => `
            <li class="autocomplete-item" data-city="${city}">
                <i class="fas fa-map-marker-alt"></i> ${city}
            </li>
        `).join('');
        autocompleteList.style.display = 'block';
        autocompleteList.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => {
                cityInput.value = '';
                autocompleteList.style.display = 'none';
                fetchCurrentWeather(item.dataset.city);
            });
        });
    }, 200);
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) autocompleteList.style.display = 'none';
});

// ==================== UTILIDADES ====================

function showLoading() {
    loadingDiv.classList.add('active');
    errorDiv.classList.remove('active');
    currentWeatherDiv.classList.remove('active');
    forecastSectionDiv.classList.remove('active');
}
function hideLoading() { loadingDiv.classList.remove('active'); }
function showError(message, query = '') {
    hideLoading();
    currentWeatherDiv.classList.remove('active');
    forecastSectionDiv.classList.remove('active');

    let suggestion = '';
    if (query) {
        const norm = q => q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const words = norm(query).split(' ').filter(w => w.length > 2);
        const similar = POPULAR_CITIES.filter(city =>
            words.some(word => norm(city).includes(word))
        ).slice(0, 4);

        if (similar.length > 0) {
            suggestion = `
                <div class="error-suggestions">
                    <p>¿Quisiste buscar alguna de estas?</p>
                    <div class="suggestion-chips">
                        ${similar.map(city => `<button class="suggestion-chip" data-city="${city}">${city}</button>`).join('')}
                    </div>
                    <p class="error-note">💡 La API solo reconoce ciudades registradas. Zonas rurales, cerros, parques o playas no están disponibles directamente.</p>
                </div>`;
        } else {
            suggestion = `<p class="error-note">💡 Intenta con la ciudad o cantón más cercano. Ejemplo: en lugar de "Cerro de la Muerte" busca "Pérez Zeledón, CR" o "San Isidro, CR".</p>`;
        }
    }

    errorDiv.innerHTML = `<span>❌ ${message}</span>${suggestion}`;
    errorDiv.classList.add('active');

    errorDiv.querySelectorAll('.suggestion-chip').forEach(btn => {
        btn.addEventListener('click', () => fetchCurrentWeather(btn.dataset.city));
    });
}
function getDegreeSymbol() { return currentUnit === 'metric' ? '°C' : '°F'; }
function getWeatherIcon(iconCode) { return `https://openweathermap.org/img/wn/${iconCode}@4x.png`; }
function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}
function formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
}

// ==================== API ====================

async function fetchCurrentWeather(city) {
    try {
        showLoading();
        const response = await fetch(
            `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${_k}&units=${currentUnit}&lang=es`
        );
        if (!response.ok) {
            if (response.status === 404) throw new Error('Ciudad no encontrada. Verifica el nombre e intenta de nuevo.');
            throw new Error('Error al obtener datos del clima');
        }
        const data = await response.json();
        currentWeatherData = data;
        await fetchForecast(data.coord.lat, data.coord.lon);
        hideLoading();
        renderCurrentWeather(data);
    } catch (error) {
        showError(error.message, city);
    }
}

async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${_k}&units=${currentUnit}&lang=es`
        );
        if (!response.ok) throw new Error('Error al obtener el pronóstico');
        const data = await response.json();
        forecastData = data;
        renderForecast(data);
    } catch (error) {
        console.error('Error en pronóstico:', error);
    }
}

async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading();
        const response = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${_k}&units=${currentUnit}&lang=es`
        );
        if (!response.ok) throw new Error('Error al obtener datos del clima');
        const data = await response.json();
        currentWeatherData = data;
        await fetchForecast(lat, lon);
        hideLoading();
        renderCurrentWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

// ==================== RENDERIZADO ====================

function renderCurrentWeather(data) {
    const { main, weather, wind, clouds, sys, name, coord } = data;
    const windUnit = currentUnit === 'metric' ? 'm/s' : 'mph';

    currentWeatherDiv.innerHTML = `
        <div class="weather-header">
            <div class="location-info">
                <h2>${name}, ${sys.country}</h2>
                <p>Lat: ${coord.lat.toFixed(2)}° | Lon: ${coord.lon.toFixed(2)}°</p>
                <p id="lastUpdate">Actualizado hace un momento</p>
            </div>
            <img class="weather-icon" src="${getWeatherIcon(weather[0].icon)}" alt="${weather[0].description}">
        </div>
        <div class="weather-main">
            <div class="weather-item">
                <div class="weather-item-label">Temperatura Actual</div>
                <div class="weather-item-value">${Math.round(main.temp)}${getDegreeSymbol()}</div>
            </div>
            <div class="weather-item">
                <div class="weather-item-label">Sensación Térmica</div>
                <div class="weather-item-value">${Math.round(main.feels_like)}${getDegreeSymbol()}</div>
            </div>
            <div class="weather-item">
                <div class="weather-item-label">Mín - Máx</div>
                <div class="weather-item-value">${Math.round(main.temp_min)}° / ${Math.round(main.temp_max)}°</div>
            </div>
            <div class="weather-item">
                <div class="weather-item-label">Humedad</div>
                <div class="weather-item-value">${main.humidity}%</div>
            </div>
        </div>
        <div class="weather-details">
            <div class="detail-item"><i class="fas fa-cloud"></i><div class="detail-text"><div class="detail-label">Condición</div><div class="detail-value">${weather[0].description}</div></div></div>
            <div class="detail-item"><i class="fas fa-wind"></i><div class="detail-text"><div class="detail-label">Viento</div><div class="detail-value">${wind.speed} ${windUnit}</div></div></div>
            <div class="detail-item"><i class="fas fa-eye"></i><div class="detail-text"><div class="detail-label">Visibilidad</div><div class="detail-value">${(data.visibility / 1000).toFixed(1)} km</div></div></div>
            <div class="detail-item"><i class="fas fa-compress"></i><div class="detail-text"><div class="detail-label">Presión</div><div class="detail-value">${main.pressure} hPa</div></div></div>
            <div class="detail-item"><i class="fas fa-droplets"></i><div class="detail-text"><div class="detail-label">Nubosidad</div><div class="detail-value">${clouds.all}%</div></div></div>
            <div class="detail-item"><i class="fas fa-sun"></i><div class="detail-text"><div class="detail-label">Amanecer</div><div class="detail-value">${formatTime(sys.sunrise)}</div></div></div>
            <div class="detail-item"><i class="fas fa-moon"></i><div class="detail-text"><div class="detail-label">Atardecer</div><div class="detail-value">${formatTime(sys.sunset)}</div></div></div>
            <div class="detail-item"><i class="fas fa-gauge"></i><div class="detail-text"><div class="detail-label">Índice UV</div><div class="detail-value">${data.uvi ? Math.round(data.uvi) : 'N/A'}</div></div></div>
        </div>
    `;
    currentWeatherDiv.classList.add('active');
    setInterval(() => {
        const el = document.getElementById('lastUpdate');
        if (el) el.textContent = 'Actualizado hace un momento';
    }, 60000);
}

function renderForecast(data) {
    const dailyForecasts = {};
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayKey = date.toLocaleDateString();
        if (!dailyForecasts[dayKey] || Math.abs(date.getHours() - 12) < Math.abs(new Date(dailyForecasts[dayKey].dt * 1000).getHours() - 12)) {
            dailyForecasts[dayKey] = forecast;
        }
    });

    forecastContainer.innerHTML = Object.values(dailyForecasts).slice(0, 5).map(forecast => `
        <div class="forecast-card">
            <div class="forecast-date">${formatDate(forecast.dt)}</div>
            <img class="forecast-icon" src="${getWeatherIcon(forecast.weather[0].icon)}" alt="${forecast.weather[0].description}">
            <div class="forecast-temp">${Math.round(forecast.main.temp)}${getDegreeSymbol()}</div>
            <div class="forecast-temp-range"><strong>${Math.round(forecast.main.temp_max)}°</strong> / <span>${Math.round(forecast.main.temp_min)}°</span></div>
            <div class="forecast-description">${forecast.weather[0].description}</div>
        </div>
    `).join('');
    forecastSectionDiv.classList.add('active');
}

// ==================== EVENT LISTENERS ====================

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        autocompleteList.style.display = 'none';
        fetchCurrentWeather(city);
        cityInput.value = '';
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { autocompleteList.style.display = 'none'; searchBtn.click(); }
});

cityInput.addEventListener('input', (e) => showAutocompleteSuggestions(e.target.value.trim()));

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.querySelector('i').className = isDark ? 'fas fa-sun' : 'fas fa-moon';
});

unitSelect.addEventListener('change', (e) => {
    currentUnit = e.target.value;
    if (currentWeatherData) fetchCurrentWeather(currentWeatherData.name);
});

// ==================== INIT ====================

function init() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => fetchWeatherByCoords(coords.latitude, coords.longitude),
            () => console.log('Geolocalización no disponible')
        );
    }
}

document.addEventListener('DOMContentLoaded', init);
