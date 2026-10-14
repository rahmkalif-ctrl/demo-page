// Dynamic Input Display using if / else if / else
  if (submitBtn && inputField && displayArea) {
    submitBtn.addEventListener('click', () => {
      const rawText = inputField.value.trim();
      const userText = rawText.toLowerCase();

      if (userText === "") {
        // Condition 1: Empty input
        displayArea.textContent = "STATUS: Empty dispatch. Enter a command or transmission.";
      } else if (userText.includes("alert") || userText.includes("danger")) {
        // Condition 2: Input contains "alert" or "danger"
        displayArea.textContent = "PRIORITY ALERT: Threat acknowledged! Defensive grid activated.";
      } else if (userText.includes("recon") || userText.includes("intel") || userText.includes("scout")) {
        // Condition 3: Input contains recon keywords
        displayArea.textContent = "RECON REPORT: Enemy movement logged near Sector 4.";
      } else if (userText.includes("ammo") || userText.includes("supply")) {
        // Condition 4: Input contains supply keywords
        displayArea.textContent = "LOGISTICS: Resupply unit dispatched to front line.";
      } else if (rawText.length > 25) {
        // Condition 5: Long transmission (over 25 characters)
        displayArea.textContent = `ENCRYPTED DISPATCH RECORDED: "${rawText}"`;
      } else {
        // Fallback: Standard message for any other input
        displayArea.textContent = `STANDARD DISPATCH RECEIVED: "${rawText}"`;
      }

      // Clear the text box
      inputField.value = "";
    });
  }
