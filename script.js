document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.navbar-nav li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href');
        const targetSection = document.querySelector(targetID);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Animate progress bars in the Skills section
    const progressBars = document.querySelectorAll('.progress-bar');
    const skillsSection = document.getElementById('skills');
    let progressAnimated = false;
    
    function animateProgressBars() {
      progressBars.forEach(bar => {
        const target = bar.getAttribute('data-percentage');
        bar.style.width = target;
      });
    }
    
    window.addEventListener('scroll', function () {
      const sectionPos = skillsSection.getBoundingClientRect().top;
      if (!progressAnimated && sectionPos < window.innerHeight) {
        animateProgressBars();
        progressAnimated = true;
      }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you shortly.');
        contactForm.reset();
      });
    }
  });
  