function Zen() {
  this.enabled = false;

  // Create the overlay element
  this.overlay = document.createElement('div');
  this.overlay.id = 'zen-mode';
  this.overlay.classList.add('zen-overlay');

  // Create wrapper to center content
  this.wrapper = document.createElement('div');
  this.wrapper.classList.add('zen-wrapper');

  // Create container for search input and icon
  this.searchContainer = document.createElement('div');
  this.searchContainer.classList.add('zen-search-container');

  // Create the Font Awesome search icon
  this.searchIcon = document.createElement('i');
  this.searchIcon.classList.add('fas', 'fa-search', 'zen-search-icon');

  // Create the search bar
  this.searchBar = document.createElement('input');
  this.searchBar.type = 'text';
  this.searchBar.placeholder = 'Search or enter address...';
  this.searchBar.classList.add('zen-search');

  // Append elements
  this.searchContainer.appendChild(this.searchIcon);
  this.searchContainer.appendChild(this.searchBar);
  this.wrapper.appendChild(this.searchContainer);
  this.overlay.appendChild(this.wrapper);
  document.body.appendChild(this.overlay);

  // Handle Enter key to search or go to URL
  this.searchBar.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      let query = e.target.value.trim();
      if (!query) return;

      // URL pattern detection
      const urlPattern = /^(https?:\/\/|www\.)/i;
      const domainPattern = /^[^\s]+\.[^\s]{2,}$/i; // simple domain check

      if (urlPattern.test(query) || domainPattern.test(query)) {
        // Add http:// if missing and starts with www. or no protocol
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

  this.onToggle = function () {
    this.enabled = !this.enabled;
    this.overlay.style.display = this.enabled ? 'flex' : 'none';
    console.log('Zen mode is now', this.enabled ? 'ON' : 'OFF');
    if (this.enabled) this.searchBar.focus();
  };
}
