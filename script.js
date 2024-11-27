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

    // Experience Timeline Hover Effect
    const timelineItems = document.querySelectorAll('#experience .timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            let infoBox = document.createElement('div');
            infoBox.className = 'extra-info';
            infoBox.innerText = item.getAttribute('data-info');
            item.appendChild(infoBox);
            infoBox.style.display = 'block';
        });

        item.addEventListener('mouseout', function () {
            const infoBox = item.querySelector('.extra-info');
            if (infoBox) {
                infoBox.remove();
            }
        });
    });
});
