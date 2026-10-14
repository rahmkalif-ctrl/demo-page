document.addEventListener('DOMContentLoaded', () => {
  const missionBtn = document.getElementById('survey-btn');
  const alertBtn = document.getElementById('alert-btn');

  // Input & Output elements
  const inputField = document.getElementById('user-input');
  const submitBtn = document.getElementById('submit-btn');
  const displayArea = document.getElementById('display-text');

  // Random Fact Generator elements
  const factBtn = document.getElementById('fact-btn');
  const factDisplay = document.getElementById('fact-display');

  // --- GAME FACTS SYSTEM ---
  const gameFacts = [
    "HELL LET LOOSE: Maps are built using authentic WWII satellite imagery and archival aerial photography to replicate real battlefields.",
    "HELL LET LOOSE: Squad leaders and commanders communicate across dedicated tactical radio channels to build garrisons and coordinate artillery.",
    "GALLIPOLI: Focuses on the intense 1915–1916 WWI campaign across the Dardanelles straits and trench combat on the Ottoman front.",
    "GALLIPOLI: Logistics and trench raiding tactics played a crucial role in naval-land amphibious operations during the campaign.",
    "BATTLEFIELD: Known for environmental destructibility, allowing players to breach walls, collapse structures, and alter combat paths.",
    "BATTLEFIELD: Features large-scale combined arms combat integrating infantry, armored tanks, transport vehicles, and aircraft."
  ];

  if (factBtn && factDisplay) {
    factBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * gameFacts.length);
      factDisplay.textContent = `INTEL FILE #${randomIndex + 1}: ${gameFacts[randomIndex]}`;
    });
  }

  // --- TIME PERIOD RECON QUIZ SYSTEM ---
  const quizQuestions = [
    {
      question: "1. What major historical conflict and time period is Hell Let Loose set in?",
      options: ["World War I (1914–1918)", "World War II (1939–1945)", "Modern / Present Day"],
      answer: 1
    },
    {
      question: "2. What time period and campaign does the game Gallipoli take place in?",
      options: ["World War I Ottoman Front (1915–1916)", "Napoleonic Wars (1803–1815)", "World War II Pacific Theater (1941–1945)"],
      answer: 0
    },
    {
      question: "3. What time period setting does Battlefield focus on for its combined arms combat?",
      options: ["Medieval Warfare", "Ancient History", "Modern Era / Present Day"],
      answer: 2
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('next-q-btn');

  function loadQuizQuestion() {
    if (!questionEl || !optionsEl) return;

    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';

    const currentQ = quizQuestions[currentQuestionIndex];
    questionEl.textContent = currentQ.question;

    currentQ.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.classList.add('quiz-opt-btn');
      btn.textContent = `${String.fromCharCode(65 + index)}) ${optText}`;

      btn.addEventListener('click', () => handleAnswer(index, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, selectedBtn) {
    const currentQ = quizQuestions[currentQuestionIndex];
    const allOptBtns = optionsEl.querySelectorAll('.quiz-opt-btn');

    // Disable all options once an answer is selected
    allOptBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQ.answer) {
      score++;
      selectedBtn.classList.add('correct');
      feedbackEl.textContent = "INTEL VERIFIED: Correct time period identified!";
    } else {
      selectedBtn.classList.add('incorrect');
      allOptBtns[currentQ.answer].classList.add('correct');
      feedbackEl.textContent = "TACTICAL ERROR: Incorrect time period!";
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      nextBtn.style.display = 'inline-block';
    } else {
      setTimeout(() => {
        questionEl.textContent = `EXAMINATION COMPLETE. FINAL SCORE: ${score} / ${quizQuestions.length}`;
        optionsEl.innerHTML = '';
        feedbackEl.textContent = score === 3 ? "PERFECT SCORE: Senior Historical Analyst rank awarded!" : "REVIEW GAME TRAILERS & TRY AGAIN.";
      }, 1000);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      loadQuizQuestion();
    });
  }

  // Initialize Quiz
  loadQuizQuestion();

  // --- MISSION EXPLOSION BUTTON ---
  if (missionBtn) {
    missionBtn.addEventListener('click', () => {
      const rect = missionBtn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      playExplosionAnimation(centerX, centerY);
    });
  }

  // --- RED ALERT BUTTON ---
  if (alertBtn) {
    alertBtn.addEventListener('click', () => {
      const paragraphs = document.querySelectorAll('main p');

      paragraphs.forEach((p) => {
        p.textContent = "WARNING: UNEXPLODED ORDNANCE THREAT DETECTED. ALL UNITS CLEAR THE AREA IMMEDIATELY.";
        p.classList.add('red-alert-text');
      });
    });
  }

  // --- DISPATCH INPUT LISTENER ---
  if (submitBtn && inputField && displayArea) {
    submitBtn.addEventListener('click', () => {
      const rawText = inputField.value.trim();
      const userText = rawText.toLowerCase();

      if (userText === "") {
        displayArea.textContent = "STATUS: Empty dispatch. Enter a command or transmission.";
      } else if (userText.includes("alert") || userText.includes("danger")) {
        displayArea.textContent = "PRIORITY ALERT: Threat acknowledged! Defensive grid activated.";
      } else if (userText.includes("recon") || userText.includes("intel") || userText.includes("scout")) {
        displayArea.textContent = "RECON REPORT: Enemy movement logged near Sector 4.";
      } else if (userText.includes("ammo") || userText.includes("supply")) {
        displayArea.textContent = "LOGISTICS: Resupply unit dispatched to front line.";
      } else if (rawText.length > 25) {
        displayArea.textContent = `ENCRYPTED DISPATCH RECORDED: "${rawText}"`;
      } else {
        displayArea.textContent = `STANDARD DISPATCH RECEIVED: "${rawText}"`;
      }

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
