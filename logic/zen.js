function Zen() {
  this.enabled = false;

  // Overlay
  this.overlay = document.createElement('div');
  this.overlay.id = 'zen-mode';
  this.overlay.classList.add('zen-overlay');

  // Wrapper for content
  this.wrapper = document.createElement('div');
  this.wrapper.classList.add('zen-wrapper');

  // Header: time on left, weather (icon + toggle) on right
  this.header = document.createElement('div');
  this.header.classList.add('zen-header');

  // Time display
  this.timeDisplay = document.createElement('div');
  this.timeDisplay.classList.add('zen-time');

  // Weather wrapper with icon + temperature toggle button
  this.weatherWrapper = document.createElement('div');
  this.weatherWrapper.classList.add('zen-weather-wrapper');
  this.weatherWrapper.style.display = 'flex';
  this.weatherWrapper.style.alignItems = 'center';

  // Weather icon image (hidden initially)
  this.weatherIcon = document.createElement('img');
  this.weatherIcon.classList.add('zen-weather-icon');
  this.weatherIcon.style.width = '24px';
  this.weatherIcon.style.height = '24px';
  this.weatherIcon.style.marginRight = '8px';
  this.weatherIcon.style.display = 'none';  // hide initially

  // Temperature toggle button
  this.weatherText = document.createElement('button');
  this.weatherText.classList.add('zen-temp-toggle');

  this.weatherWrapper.appendChild(this.weatherIcon);
  this.weatherWrapper.appendChild(this.weatherText);

  this.header.appendChild(this.timeDisplay);
  this.header.appendChild(this.weatherWrapper);

  // Search container
  this.searchContainer = document.createElement('div');
  this.searchContainer.classList.add('zen-search-container');

  // Font Awesome search icon
  this.searchIcon = document.createElement('i');
  this.searchIcon.classList.add('fas', 'fa-search', 'zen-search-icon');

  // Search input
  this.searchBar = document.createElement('input');
  this.searchBar.type = 'text';
  this.searchBar.placeholder = 'Search or enter address...';
  this.searchBar.classList.add('zen-search');

  this.searchContainer.appendChild(this.searchIcon);
  this.searchContainer.appendChild(this.searchBar);

  // Assemble the overlay
  this.wrapper.appendChild(this.header);
  this.wrapper.appendChild(this.searchContainer);
  this.overlay.appendChild(this.wrapper);
  document.body.appendChild(this.overlay);

  // Search on Enter key
  this.searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let query = this.searchBar.value.trim();
      if (!query) return;

      const urlPattern = /^(https?:\/\/|www\.)/i;
      const domainPattern = /^[^\s]+\.[^\s]{2,}$/i;

      if (urlPattern.test(query) || domainPattern.test(query)) {
        if (/^www\./i.test(query)) {
          query = 'http://' + query;
        } else if (!/^https?:\/\//i.test(query)) {
          query = 'http://' + query;
        }
        window.location.href = query;
      } else {
        const searchUrl = SETTINGS.SEARCHENGINE + encodeURIComponent(query);
        window.location.href = searchUrl;
      }
    }
  });

  // Toggle Zen mode display
  this.onToggle = () => {
    this.enabled = !this.enabled;
    this.overlay.style.display = this.enabled ? 'flex' : 'none';
    if (this.enabled) {
      setTimeout(() => this.searchBar.focus(), 10);
    }
  };

  // Clock updater
  this.updateTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    this.timeDisplay.textContent = now.toLocaleTimeString([], options);
  };
  setInterval(this.updateTime, 1000);
  this.updateTime();

  // Weather code to icon URL mapping
  const weatherCodeToIcon = {
    0: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',        // Clear sky
    1: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',      // Mainly clear
    2: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',      // Partly cloudy
    3: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',        // Overcast
    45: 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png',     // Fog
    48: 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png',     // Depositing rime fog
    51: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',     // Drizzle light
    53: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',     // Drizzle moderate
    55: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',     // Drizzle dense
    61: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain slight
    63: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain moderate
    65: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain heavy
    71: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',     // Snow slight
    73: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',     // Snow moderate
    75: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',     // Snow heavy
    80: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain showers
    81: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain showers heavy
    82: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',     // Rain showers violent
    95: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',     // Thunderstorm
    96: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',     // Thunderstorm with hail
    99: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png'      // Thunderstorm with hail
  };

  // Temperature unit and weather data storage
  this.tempUnit = 'F'; // Default Fahrenheit
  this.weatherData = null;

  // Update displayed temperature and icon
  this.updateWeatherDisplay = () => {
    if (!this.weatherData) return;
    const { celsius, fahrenheit } = this.weatherData;
    const display = this.tempUnit === 'C' ? `${celsius}°C` : `${fahrenheit}°F`;
    this.weatherText.textContent = display;
  };

  // Click temperature to toggle unit
  this.weatherText.addEventListener('click', () => {
    this.tempUnit = this.tempUnit === 'C' ? 'F' : 'C';
    this.updateWeatherDisplay();
  });

  // Fetch weather data using geolocation + Open-Meteo API
  this.fetchWeather = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`;

        const res = await fetch(url);
        const data = await res.json();

        if (data && data.current_weather) {
          const celsius = Math.round(data.current_weather.temperature);
          const fahrenheit = Math.round((celsius * 9) / 5 + 32);
          const weatherCode = data.current_weather.weathercode;

          this.weatherData = { celsius, fahrenheit };

          // Set weather icon src, fallback to clear sky icon if unknown code
          this.weatherIcon.src = weatherCodeToIcon[weatherCode] || 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
          this.weatherIcon.alt = 'Weather icon';
          this.weatherIcon.style.display = 'inline';  // show icon now

          this.updateWeatherDisplay();
        } else {
          this.weatherText.textContent = 'Weather unavailable';
          this.weatherIcon.style.display = 'none';
        }
      }, () => {
        this.weatherText.textContent = 'Location blocked';
        this.weatherIcon.style.display = 'none';
      });
    } catch (err) {
      this.weatherText.textContent = 'Error getting weather';
      this.weatherIcon.style.display = 'none';
    }
  };

  this.fetchWeather();
}