document.addEventListener("DOMContentLoaded", function () { 
  const weddingDate = new Date("2025-11-08T15:00:00").getTime(); // Nov 8, 3PM

  const countdownElements = document.querySelectorAll(".timer");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElements.forEach(timer => {
      timer.querySelector(".days").innerText = days;
      timer.querySelector(".hours").innerText = hours;
      timer.querySelector(".minutes").innerText = minutes;
      

      if (distance < 0) {
        timer.innerHTML = "🎉 Just Married!";
      }
    });

  }

  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);
  
  const submitButton = document.getElementById("submitBtn");

  submitButton.addEventListener("click", function () {
    const guestInput = document.getElementById("guestName");
    const guestName = guestInput.value.trim();
    const guestCount = document.getElementById("guestCount").value;
    const messageDiv = document.getElementById("confirmationMessage");
    
    if (!guestName) {
      messageDiv.textContent = "Missing name";
      return;
    }
    if(!guestCount){
      messageDiv.textContent = "Please select the number of guests"
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    
    messageDiv.textContent = "Submitting RSVP...";
    fetch('https://script.google.com/macros/s/AKfycbz-5vnntIPNKL0nF-5eXMtKHFkSs5RidOS0lMOsrPS9h-hA_11YTa-81DBxhZ_wSoTu/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({ name: guestName, count: guestCount })
    })
    .then(res => res.text())
    .then(response => {
      messageDiv.textContent = response;
    })
    .catch(error => {
      console.error("Error:", error);
      messageDiv.textContent = "Something went wrong.";
    })
    .finally(() => {
      // Re-enable button no matter what
      submitButton.disabled = false;
      submitButton.textContent = "Submit RSVP";
      guestInput.value = " "
    });
  });
});
