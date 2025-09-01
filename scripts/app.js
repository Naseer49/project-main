// app.js — validate & redirect to ads.html

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorElem = document.getElementById('error-msg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name   = document.getElementById('name')?.value.trim() || '';
      const number = document.getElementById('number')?.value.trim() || '';
      const cnic   = document.getElementById('cnic')?.value.trim() || '';

      const numberPattern = /^03[0-9]{9}$/;   // format: 03XXXXXXXXX (11 digits)
      const cnicPattern   = /^[0-9]{13}$/;    // exactly 13 digits

      if (errorElem) errorElem.style.display = 'none';

      // Validate name
      if (name.length < 2) {
        errorElem.textContent = 'Please enter your name';
        errorElem.style.display = 'block';
        document.getElementById('name')?.focus();
        return;
      }

      // Validate phone
      if (!numberPattern.test(number)) {
        errorElem.textContent = 'Invalid phone number (format: 03XXXXXXXXX)';
        errorElem.style.display = 'block';
        document.getElementById('number')?.focus();
        return;
      }

      // Validate CNIC
      if (!cnicPattern.test(cnic)) {
        errorElem.textContent = 'Invalid CNIC (must be 13 digits)';
        errorElem.style.display = 'block';
        document.getElementById('cnic')?.focus();
        return;
      }

      // ✅ Success: redirect to ads.html
      window.location.href = "ads.html";
    });
  }

  // Optional: if you have a "Close" button
  document.getElementById('closeBtn')?.addEventListener('click', () => {
    window.location.href = "ads.html";
  });
});
