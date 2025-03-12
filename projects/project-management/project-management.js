document.addEventListener('DOMContentLoaded', function () {
  // Authorization Modal
  const authModalOverlay = document.getElementById('authModalOverlay');
  const authYesBtn = document.getElementById('authYesBtn');
  const authNoBtn = document.getElementById('authNoBtn');

  authYesBtn.addEventListener('click', () => {
    authModalOverlay.style.display = 'none';
  });

  authNoBtn.addEventListener('click', () => {
    window.location.href = 'https://google.com';
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.navbar a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // IntersectionObserver for fade-in animations
  const sections = document.querySelectorAll('.section');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // CTA button
  const ctaButton = document.getElementById('ctaButton');
  ctaButton.addEventListener('click', function() {
    alert('Thank you for your interest! Please contact me at Ramey-fahal@uiowa.com to schedule a meeting.');
  });
  
  // Scroll-to-Top logic
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Return Home button fade-out
  const returnHomeBtn = document.getElementById('returnHomeBtn');
  returnHomeBtn.addEventListener('click', () => {
    document.body.style.transition = 'opacity 0.8s';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'https://RameyFahal.com';
    }, 800);
  });
});
