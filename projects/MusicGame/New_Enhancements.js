// enhancements.js

document.addEventListener('DOMContentLoaded', function() {
    // Create modal elements
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modalOverlay';
    modalOverlay.style.position = 'fixed';
    modalOverlay.style.top = 0;
    modalOverlay.style.left = 0;
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
    modalOverlay.style.display = 'none';
    modalOverlay.style.alignItems = 'center';
    modalOverlay.style.justifyContent = 'center';
    modalOverlay.style.zIndex = '1000';
    document.body.appendChild(modalOverlay);
  
    const modalImage = document.createElement('img');
    modalImage.style.maxWidth = '90%';
    modalImage.style.maxHeight = '90%';
    modalImage.style.border = '5px solid #FFC107';
    modalImage.style.borderRadius = '5px';
    modalOverlay.appendChild(modalImage);
  
    // When any image is clicked, open the modal
    const allImages = document.querySelectorAll('.section img');
    allImages.forEach(img => {
      img.addEventListener('click', function() {
        modalImage.src = this.src;
        modalOverlay.style.display = 'flex';
      });
    });
  
    // Close modal on click anywhere on the overlay
    modalOverlay.addEventListener('click', function() {
      modalOverlay.style.display = 'none';
    });
});
