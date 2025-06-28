function Zen() {
  this.enabled = false;

  // Overlay
  this.overlay = document.createElement('div');
  this.overlay.id = 'zen-mode';
  this.overlay.classList.add('zen-overlay');

  // Wrapper for content
  this.wrapper = document.createElement('div');
  this.wrapper.classList.add('zen-wrapper');

  // Header: time (left), weather (right)
  this.header = document.createElement('div');
  this.header.classList.add('zen-header');

  // Time
  this.timeDisplay = document.createElement('div');
  this.timeDisplay.classList.add('zen-time');

  // Weather (acts as button)
  this.weatherText = document.createElement('button');
  this.weatherText.classList.add('zen-temp-toggle');

  this.header.appendChild(this.timeDisplay);
  this.header.appendChild(this.weatherText);

  // Search container
  this.searchContainer = document.createElement('div');
  this.searchContainer.classList.add('zen-search-container');

  this.searchIcon = document.createElement('i');
  this.searchIcon.classList.add('fas', 'fa-search', 'zen-search-icon');

  this.searchBar = document.createElement('input');
  this.searchBar.type = 'text';
  this.searchBar.placeholder = 'Search or enter address...';
  this.searchBar.classList.add('zen-search');

  this.searchContainer.appendChild(this.searchIcon);
  this.searchContainer.appendChild(this.searchBar);

  // Assemble
  this.wrapper.appendChild(this.header);
  this.wrapper.appendChild(this.searchContainer);
  this.overlay.appendChild(this.wrapper);
  document.body.appendChild(this.overlay);

  // Search handler
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

  // Toggle Zen mode
  this.onToggle = () => {
    this.enabled = !this.enabled;
    this.overlay.style.display = this.enabled ? 'flex' : 'none';
    if (this.enabled) {
      setTimeout(() => this.searchBar.focus(), 10);
    }
  };

  // Clock
  this.updateTime = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    this.timeDisplay.textContent = now.toLocaleTimeString([], options);
  };
  setInterval(this.updateTime, 1000);
  this.updateTime();

  // Weather
  this.tempUnit = 'F'; // Default to Fahrenheit
  this.weatherData = null;

  this.updateWeatherDisplay = () => {
    if (!this.weatherData) return;
    const { celsius, fahrenheit } = this.weatherData;
    const display = this.tempUnit === 'C' ? `${celsius}°C` : `${fahrenheit}°F`;
    this.weatherText.textContent = display;
  };

  this.weatherText.addEventListener('click', () => {
    this.tempUnit = this.tempUnit === 'C' ? 'F' : 'C';
    this.updateWeatherDisplay();
  });

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
          this.weatherData = { celsius, fahrenheit };
          this.updateWeatherDisplay();
        } else {
          this.weatherText.textContent = 'Weather unavailable';
        }
      }, () => {
        this.weatherText.textContent = 'Location blocked';
      });
    } catch (err) {
      this.weatherText.textContent = 'Error getting weather';
    }
  };

  this.fetchWeather();
}
