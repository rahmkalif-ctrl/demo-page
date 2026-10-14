document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('survey-btn');

  if (!button) return;

  button.addEventListener('click', (e) => {
    // 1. Position tracking
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 2. Trigger the real asset animation
    spawnRealExplosion(x, y);

    // 3. Show popup message after animation (delay 800ms)
    setTimeout(() => {
      const response = confirm("MISSION ACCOMPLISHED.\nWere you able to view the battlefield intelligence videos?");
      if (response) {
        alert("EXCELLENT. Return to duties.");
      } else {
        alert("AWAITING RECON REPORT. Review links when possible.");
      }
    }, 800); // Matches the duration of the CSS animation
  });
});

function spawnRealExplosion(x, y) {
  // Create a container div for the explosion
  const exp = document.createElement('div');
  
  // Apply CSS class that links to your explosion.png
  exp.classList.add('real-explosion-effect');
  
  // Position the effect where the button center is (relative to screen)
  exp.style.left = `${x}px`;
  exp.style.top = `${y}px`;

  // Cleanup: Remove the element after the animation finishes
  exp.addEventListener('animationend', () => {
    exp.remove();
  });

  document.body.appendChild(exp);
}
