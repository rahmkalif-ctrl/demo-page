document.addEventListener('DOMContentLoaded', () => {
  const missionBtn = document.getElementById('survey-btn');
  const alertBtn = document.getElementById('alert-btn');

  // Input & Output elements
  const inputField = document.getElementById('user-input');
  const submitBtn = document.getElementById('submit-btn');
  const displayArea = document.getElementById('display-text');

  // Mission Explosion Button Listener
  if (missionBtn) {
    missionBtn.addEventListener('click', () => {
      const rect = missionBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      playExplosionAnimation(centerX, centerY);
    });
  }

  // Ordnance Threat Text Transition Listener
  if (alertBtn) {
    alertBtn.addEventListener('click', () => {
      const paragraphs = document.querySelectorAll('main p');

      paragraphs.forEach((p) => {
        p.textContent = "WARNING: UNEXPLODED ORDNANCE THREAT DETECTED. ALL UNITS CLEAR THE AREA IMMEDIATELY.";
        p.classList.add('red-alert-text');
      });
    });
  }

  // Dynamic Input Display using if / else if / else
  if (submitBtn && inputField && displayArea) {
    submitBtn.addEventListener('click', () => {
      // Convert input to lowercase to catch keywords regardless of capitalization
      const userText = inputField.value.trim().toLowerCase();

      if (userText === "") {
        displayArea.textContent = "NOTICE: NO DISPATCH TEXT ENTERED.";
      } else if (userText === "red alert" || userText === "alert") {
        displayArea.textContent = "COMMAND RESPONSE: HIGH ALERT PROTCOLS ACTIVATED. RETREAT TO DEFENSIVE POSITIONS!";
      } else if (userText === "ww2" || userText === "history") {
        displayArea.textContent = "INTELLIGENCE BRIEF: RECONNAISSANCE FILE #1944 UNLOCKED. REVIEW GAMES LIST BELOW.";
      } else if (userText === "gallipoli") {
        displayArea.textContent = "TACTICAL RECORD: 1915 DARDANELLES CAMPAIGN DOSSIER ACCESSED.";
      } else {
        // Fallback for any standard user dispatch entry
        displayArea.textContent = `DISPATCH RECORDED: "${inputField.value.trim()}"`;
      }

      // Clear the input box after transmission
      inputField.value = "";
    });
  }
});

function playExplosionAnimation(x, y) {
  const canvas = document.createElement('canvas');
  canvas.id = 'explosion-canvas';
  const size = 260;
  canvas.width = size;
  canvas.height = size;

  canvas.style.position = 'fixed';
  canvas.style.left = `${x - size / 2}px`;
  canvas.style.top = `${y - size / 2}px`;
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = 'explosion.png';

  img.onload = () => {
    const cols = 10;
    const rows = 5;
    const totalFrames = cols * rows;
    const frameWidth = img.width / cols;
    const frameHeight = img.height / rows;

    let currentFrame = 0;

    const interval = setInterval(() => {
      ctx.clearRect(0, 0, size, size);

      const col = currentFrame % cols;
      const row = Math.floor(currentFrame / cols);

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

      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        canvas.remove();

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
