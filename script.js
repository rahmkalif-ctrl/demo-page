
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('survey-btn');

  if (!button) return;

  button.addEventListener('click', (e) => {
    // Get button position on the screen
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Trigger particle explosion effect
    createExplosion(x, y);

    // Show popup message after a slight explosion delay (400ms)
    setTimeout(() => {
      const response = confirm("Were you able to watch the videos?");
      if (response) {
        alert("Awesome! Hope you enjoyed the battlefield action.");
      } else {
        alert("No worries! You can check out the links whenever you are ready.");
      }
    }, 400);
  });
});

// Particle Explosion Animation Function
function createExplosion(x, y) {
  const particleCount = 30;
  const colors = ['#a38853', '#d1b475', '#ff4500', '#ff8c00', '#ffffff'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    document.body.appendChild(particle);

    // Particle styling
    const size = Math.random() * 8 + 4;
    particle.style.position = 'fixed';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';

    // Calculate explosion velocity and vector
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 120 + 30;
    const destinationX = Math.cos(angle) * velocity;
    const destinationY = Math.sin(angle) * velocity;

    // Animate particle movement and fade-out
    const animation = particle.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${destinationX}px), calc(-50% + ${destinationY}px)) scale(0)`, opacity: 0 }
    ], {
      duration: Math.random() * 500 + 400,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      fill: 'forwards'
    });

    // Remove particle from DOM after animation completes
    animation.onfinish = () => {
      particle.remove();
    };
  }
}
