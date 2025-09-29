// script.js

// Auto-update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links (optional enhancement)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  });
});

// Optional: Add subtle fade-in on scroll (lightweight)
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  // Trigger fade-in immediately for hero (no scroll needed)
  const hero = document.querySelector('.hero');
  hero.style.opacity = '0';
  hero.style.transition = 'opacity 0.8s ease';
  setTimeout(() => { hero.style.opacity = '1'; }, 100);
});

// Add fade-in class (for JS-enhanced animation)
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
});