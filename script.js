// Zorgt ervoor dat de standaardmodus 'light-mode' is.
// Je kunt ook controleren of de gebruiker een voorkeur heeft (prefers-color-scheme).
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
  
    // Standaardmodus instellen
    body.classList.add('light-mode');
  
    // Dark mode togglen
    themeToggle.addEventListener('change', () => {
      if (themeToggle.checked) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
      }
    });
  
    // (Optioneel) Contactformulier versturen
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
      };
  
      try {
        // Verstuur naar je Node.js server (indien actief)
        // Zorg voor de juiste URL, bijv. http://localhost:3000/contact
        const response = await fetch('http://localhost:3000/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Er is iets misgegaan bij het verzenden van het formulier.');
        }
  
        const result = await response.json();
        console.log('Formulier verstuurd:', result);
  
        // Eventueel: gebruiker bevestigen dat het bericht is verzonden
        alert('Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.');
        contactForm.reset();
      } catch (error) {
        console.error(error);
        alert('Er is een fout opgetreden. Probeer het later opnieuw.');
      }
    });
  });