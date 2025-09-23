const boxes = document.querySelectorAll(".gyn-box span");
const boxContainer = document.querySelector(".gyn-boxes");
const lockBtn = document.querySelector(".gyn-lock");
const gynNumber = document.querySelector(".gyn-number");
const dialogBtn = document.querySelector(".gyn-lock-your-number");
const dialog = document.querySelector(".gyn-dialog");
const streak = document.querySelector(".gyn-highest-streak span");
const gynBtn = document.querySelector(".gyn-lock-btn");
const winDialog = document.querySelector(".gyn-dialog-win");

const min = 1;
const max = 9;

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

boxContainer.addEventListener("click", (e) => {
  console.log(e.target);
  e.target.classList.add("flip");
  e.target.children[0].style.visibility = "visible";
  console.log(gynNumber.value);

  if (e.target.children[0].textContent === gynNumber.value) {
    e.target.children[0].style.color = "#5cb85c";
    streak.textContent = Number(streak.textContent + 1);

    confetti({
      particleCount: 1000,
      spread: 100,
      origin: { y: 0.5 },
    });
    setTimeout(() => {
      winDialog.showModal();
    }, 500);
  } else {
    e.target.children[0].style.color = "#ff4545";
  }
});

// Open the popup for guessing the number
dialogBtn.addEventListener("click", () => {
  dialog.showModal();
});

// Lock the guessed number and unlock the guessing
lockBtn.addEventListener("click", () => {
  gynNumber.setAttribute("disabled", true);
  dialogBtn.classList.add("hidden");
  dialog.close();
});
