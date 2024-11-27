document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for navigation links
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you shortly.');
    });
});
