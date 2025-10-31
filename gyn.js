const boxes = document.querySelectorAll(".gyn-box span");
const boxContainer = document.querySelector(".gyn-boxes");
const lockBtn = document.querySelector(".gyn-lock");
const gynNumber = document.querySelector(".gyn-number");
const dialogBtn = document.querySelector(".gyn-lock-your-number");
const dialog = document.querySelector(".gyn-dialog");
const streak = document.querySelector(".gyn-highest-streak span");
const gynBtn = document.querySelector(".gyn-lock-btn");
const winDialog = document.querySelector(".gyn-dialog-win");
const loseDialog = document.querySelector(".gyn-dialog-lose");
const resetGame = document.querySelector(".gyn-reset");
const continueGame = document.querySelector(".gyn-continue");
const attempts = document.querySelector(".gyn-attempts-score span");
const tryAgain = document.querySelector(".gyn-try-again");

const min = 1;
const max = 9;

function getRandomNumber() {
  let numbers = [];

  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  for (let i = 7; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  boxes.forEach((box, i) => {
    box.textContent = numbers[i];
  });
}

getRandomNumber();

boxContainer.addEventListener("click", (e) => {
  const box = e.target.closest(".gyn-box");
  if (!box) return;
  if (box) {
    e.target.classList.add("flip");
    e.target.children[0].style.visibility = "visible";
    console.log(gynNumber.value);

    if (e.target.children[0].textContent === gynNumber.value) {
      e.target.children[0].style.color = "#5cb85c";
      streak.textContent = Number(streak.textContent) + 1;

      confetti({
        particleCount: 1000,
        spread: 100,
        origin: { y: 0.5 },
      });
      setTimeout(() => {
        winDialog.showModal();
      }, 200);
    } else {
      e.target.children[0].style.color = "#ff4545";
      attempts.textContent = Number(attempts.textContent) - 1;
      if (Number(attempts.textContent) < 1) {
        loseDialog.showModal();
      }
    }
  }
});

// Input restrictioons on GYN
gynNumber.addEventListener("input", () => {
  // remove anything that is not 1–9
  gynNumber.value = gynNumber.value.replace(/[^1-9]/g, "");

  // limit to one digit only
  if (gynNumber.value.length > 1) {
    gynNumber.value = gynNumber.value.slice(0, 1);
  }
});

gynNumber.addEventListener("change", () => {
  gynNumber.nextElementSibling.removeAttribute("disabled");
});

// Open the popup for guessing the number
dialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Lock the guessed number and unlock the guessing
lockBtn.addEventListener("click", () => {
  // gynNumber.value = "";
  // gynNumber.setAttribute("disabled", true);
  dialogBtn.classList.add("hidden");
  dialog.close();
});

// Reset/Continue the game
[resetGame, continueGame, tryAgain].forEach((btn) => {
  btn.addEventListener("click", () => resetGameState(btn));
  getRandomNumber();
});

function resetGameState(btn) {
  winDialog.close();
  loseDialog.close();
  document.querySelectorAll(".flip").forEach((el) => {
    if (el.children[0].tagName === "SPAN") {
      el.children[0].style.visibility = "hidden";
    }
    el.classList.remove("flip");
  });
  if (!btn.classList[0].includes("gyn-continue")) {
    streak.textContent = 0;
  }
  dialogBtn.classList.remove("hidden");
  gynNumber.value = "";
  attempts.textContent = 3;
  getRandomNumber();
}
