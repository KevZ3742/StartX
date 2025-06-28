function Zen() {
  this.enabled = false;

  // Container for top bar when NOT in zen mode
  this.container = document.createElement('div');
  this.container.id = 'top-ui-bar';
  this.container.style.display = 'none'; // hidden initially

  // Time display
  this.timeDisplay = document.createElement('div');
  this.timeDisplay.classList.add('zen-time');

  // Weather wrapper
  this.weatherWrapper = document.createElement('div');
  this.weatherWrapper.classList.add('zen-weather-wrapper');
  this.weatherWrapper.style.display = 'flex';
  this.weatherWrapper.style.alignItems = 'center';

  this.weatherIcon = document.createElement('img');
  this.weatherIcon.classList.add('zen-weather-icon');
  this.weatherIcon.style.width = '24px';
  this.weatherIcon.style.height = '24px';
  this.weatherIcon.style.marginRight = '8px';
  this.weatherIcon.style.display = 'none'; // hidden initially

  this.weatherText = document.createElement('button');
  this.weatherText.classList.add('zen-temp-toggle');

  this.weatherWrapper.appendChild(this.weatherIcon);
  this.weatherWrapper.appendChild(this.weatherText);

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

  // Zen overlay elements
  this.overlay = document.createElement('div');
  this.overlay.id = 'zen-mode';
  this.overlay.classList.add('zen-overlay');

  this.wrapper = document.createElement('div');
  this.wrapper.classList.add('zen-wrapper');

  this.header = document.createElement('div');
  this.header.classList.add('zen-header');

  // In Zen mode, header holds time and weather
  this.header.appendChild(this.timeDisplay);
  this.header.appendChild(this.weatherWrapper);

  this.wrapper.appendChild(this.header);
  this.wrapper.appendChild(this.searchContainer);
  this.overlay.appendChild(this.wrapper);
  document.body.appendChild(this.overlay);

  // Append the top bar container near the top of the document body
  document.body.insertBefore(this.container, document.body.firstChild);

  // Add shared UI elements to top container for normal mode
  this.container.appendChild(this.timeDisplay);
  this.container.appendChild(this.searchContainer);
  this.container.appendChild(this.weatherWrapper);

  // Search Enter key handling
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

  // Toggle Zen mode display and move UI elements accordingly
  this.onToggle = () => {
    this.enabled = !this.enabled;

    if (this.enabled) {
      // Show Zen overlay, hide top container
      this.overlay.style.display = 'flex';
      this.container.style.display = 'none';

      // Move UI elements to Zen overlay
      this.header.appendChild(this.timeDisplay);
      this.header.appendChild(this.weatherWrapper);
      this.wrapper.appendChild(this.searchContainer);

      setTimeout(() => this.searchBar.focus(), 10);
    } else {
      // Hide Zen overlay, show top container
      this.overlay.style.display = 'none';
      this.container.style.display = 'flex';

      // Move UI elements to top container
      this.container.appendChild(this.timeDisplay);
      this.container.appendChild(this.searchContainer);
      this.container.appendChild(this.weatherWrapper);
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

  // Weather icons map (keep as is)
  const weatherCodeToIcon = {
    0: 'https://cdn-icons-png.flaticon.com/512/869/869869.png',
    1: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
    2: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
    3: 'https://cdn-icons-png.flaticon.com/512/414/414825.png',
    45: 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png',
    48: 'https://cdn-icons-png.flaticon.com/512/1163/1163634.png',
    51: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',
    53: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',
    55: 'https://cdn-icons-png.flaticon.com/512/1163/1163620.png',
    61: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    63: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    65: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    71: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',
    73: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',
    75: 'https://cdn-icons-png.flaticon.com/512/1163/1163639.png',
    80: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    81: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    82: 'https://cdn-icons-png.flaticon.com/512/1163/1163615.png',
    95: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    96: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
    99: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png'
  };

  this.tempUnit = 'F'; // Default Fahrenheit
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
          const weatherCode = data.current_weather.weathercode;

          this.weatherData = { celsius, fahrenheit };

          this.weatherIcon.src = weatherCodeToIcon[weatherCode] || weatherCodeToIcon[0];
          this.weatherIcon.alt = 'Weather icon';
          this.weatherIcon.style.display = 'inline';

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