import './style.css';

// 1. MENÚ MÓVIL
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('hidden');
  });
}

// Cerrar menú al hacer click en enlaces
document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.add('hidden');
  });
});

// 2. HEADER CON EFECTO SCROLL
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

//  3. CONTADOR ANIMADO 
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter: Element) => {
  const target = parseInt(counter.getAttribute('data-target') || '0');
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.textContent = Math.ceil(current).toString();
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toString();
    }
  };

  updateCounter();
};

// Intersection Observer para activar contador cuando sea visible
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

//4. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
    if (href && href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

//5. FORMULARIO DE CONTACTO
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const mensaje = (document.getElementById('mensaje') as HTMLTextAreaElement).value.trim();
    const status = document.getElementById('status');

    // Validaciones
    if (!nombre || !email || !mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido');
      return;
    }

    if (mensaje.length < 10) {
      alert('El mensaje debe tener al menos 10 caracteres');
      return;
    }

    // Mostrar mensaje de éxito
    if (status) {
      status.classList.remove('hidden');
      contactForm.reset();

      setTimeout(() => {
        status.classList.add('hidden');
      }, 4000);
    }
  });
}

// 6. SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll('.group');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in-up');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));
