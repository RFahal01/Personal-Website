// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
    
    // Call-to-action button event handler
    const ctaButton = document.getElementById('ctaButton');
    ctaButton.addEventListener('click', function() {
      alert('Thank you for your interest! Please contact me at Ramey-fahal@uiowa.com to schedule a meeting.');
    });
  });
  