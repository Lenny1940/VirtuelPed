// Haustierdaten
let pet = {
  type: localStorage.getItem("petType") || "pet1",
  name: localStorage.getItem("petName") || "Fluffy",
  xp: parseInt(localStorage.getItem("petXP")) || 0,
  level: parseInt(localStorage.getItem("petLevel")) || 1,
  mood: localStorage.getItem("petMood") || "😊 Glücklich",
  missionCompleted: localStorage.getItem("missionCompleted") === "true" || false
};

// DOM Elemente
const petNameInput = document.getElementById("petNameInput");
const petNameEl = document.getElementById("petName");
const petMoodEl = document.getElementById("petMood");
const petLevelEl = document.getElementById("petLevel");
const xpBar = document.getElementById("xpBar");
const xpText = document.getElementById("xpText");
const petSelect = document.getElementById("petSelect");

// Sounds
const feedSound = document.getElementById("feedSound");
const playSound = document.getElementById("playSound");
const levelUpSound = document.getElementById("levelUpSound");

// Haustierbilder
const petImages = {
  pet1: "images/pet1.png",
  pet2: "images/pet2.png",
  sleep: "images/pet_sleep.png"
};

// UI Update
function updateUI() {
  petNameEl.innerText = pet.name;
  petMoodEl.innerText = "Stimmung: " + pet.mood;
  petLevelEl.innerText = "Level: " + pet.level;
  xpBar.style.width = pet.xp + "%";
  xpText.innerText = "XP: " + pet.xp;

  const imgEl = document.querySelector(".pet-card img");
  imgEl.src = (pet.mood === "😴 Müde") ? petImages.sleep : petImages[pet.type];

  savePet();
}

// Save LocalStorage
function savePet() {
  localStorage.setItem("petType", pet.type);
  localStorage.setItem("petName", pet.name);
  localStorage.setItem("petXP", pet.xp);
  localStorage.setItem("petLevel", pet.level);
  localStorage.setItem("petMood", pet.mood);
  localStorage.setItem("missionCompleted", pet.missionCompleted);
}

// Gain XP and Level
function gainXP(amount) {
  pet.xp += amount;
  if (pet.xp >= 100) {
    pet.level += 1;
    pet.xp = 0;
    levelUpSound.play();
    alert(`🎉 ${pet.name} hat Level ${pet.level} erreicht!`);
  }
}

// Actions
function feedPet() {
  gainXP(10);
  pet.mood = "😋 Zufrieden";
  feedSound.play();
  updateUI();
}

function playPet() {
  gainXP(15);
  pet.mood = "😁 Fröhlich";
  playSound.play();
  updateUI();
}

function sleepPet() {
  gainXP(5);
  pet.mood = "😴 Müde";
  updateUI();
}

// Mini-Spiel (Ball fangen)
function miniGame() {
  const success = Math.random() > 0.3; // 70% Chance
  if (success) {
    alert("⚡ Du hast das Ballspiel gewonnen! +20 XP");
    gainXP(20);
  } else {
    alert("😅 Ball verpasst! +5 XP");
    gainXP(5);
  }
  updateUI();
}

// Daily Mission
function completeMission() {
  if (!pet.missionCompleted) {
    alert("✅ Mission abgeschlossen! +30 XP");
    gainXP(30);
    pet.missionCompleted = true;
    updateUI();
  } else {
    alert("Du hast die Mission schon heute abgeschlossen!");
  }
}

// Change Name
petNameInput.addEventListener("change", () => {
  const name = petNameInput.value.trim();
  if(name) pet.name = name;
  petNameInput.value = "";
  updateUI();
});

// Change Pet
petSelect.addEventListener("change", () => {
  pet.type = petSelect.value;
  updateUI();
});

// Init
updateUI();
