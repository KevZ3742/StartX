function Zen() {
  this.enabled = false;

  // Create the overlay element
  this.overlay = document.createElement('div');
  this.overlay.id = 'zen-mode';
  this.overlay.classList.add('zen-overlay'); // ⬅️ use CSS class only
  this.overlay.style.display = 'none'; // start hidden

  // Add to DOM
  document.body.appendChild(this.overlay);

  this.onToggle = function() {
    this.enabled = !this.enabled;
    this.overlay.style.display = this.enabled ? 'block' : 'none'; // ⬅️ just toggle display
    console.log('Zen mode is now', this.enabled ? 'ON' : 'OFF');
  }
}
