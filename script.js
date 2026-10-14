document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('survey-btn');

  if (!button) return;

  button.addEventListener('click', () => {
    // Get center position of the button on screen
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Trigger the 50-frame canvas explosion
    playExplosionAnimation(centerX, centerY);
  });
});

function playExplosionAnimation(x, y) {
  // Create an overlay canvas element
  const canvas = document.createElement('canvas');
  canvas.id = 'explosion-canvas';
  const size = 260; // Rendered explosion size in pixels
  canvas.width = size;
  canvas.height = size;

  // Center the canvas over the button click coordinates
  canvas.style.position = 'fixed';
  canvas.style.left = `${x - size / 2}px`;
  canvas.style.top = `${y - size / 2}px`;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Load the sprite sheet image
  const img = new Image();
  img.src = 'explosion.png'; // Points to your renamed image file

  img.onload = () => {
    const cols = 10; // 10 columns wide
    const rows = 5;  // 5 rows tall
    const totalFrames = cols * rows; // 50 total frames
    const frameWidth = img.width / cols;
    const frameHeight = img.height / rows;

    let currentFrame = 0;

    // Play at ~30 FPS (one frame every 33ms)
    const interval = setInterval(() => {
      ctx.clearRect(0, 0, size, size);

      const col = currentFrame % cols;
      const row = Math.floor(currentFrame / cols);

      // Crop current frame from sprite sheet and draw to canvas
      ctx.drawImage(
        img,
        col * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        0,
        0,
        size,
        size
      );

      currentFrame++;

      // When the 50-frame sequence completes
      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        canvas.remove();

        // Trigger the post-mission popup
        setTimeout(() => {
          const response = confirm("MISSION ACCOMPLISHED.\nWere you able to view the battlefield intelligence videos?");
          if (response) {
            alert("EXCELLENT. Return to duties.");
          } else {
            alert("AWAITING RECON REPORT. Review links when possible.");
          }
        }, 150);
      }
    }, 33);
  };

  img.onerror = () => {
    canvas.remove();
    alert("Could not load explosion.png. Make sure 'explosion.png' is saved in your project repository!");
  };
}
