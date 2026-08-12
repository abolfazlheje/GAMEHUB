const games = [
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    rating: "9.2",
    icon: "🌃"
  },
  {
    title: "Call of Duty",
    genre: "FPS",
    rating: "8.9",
    icon: "🔫"
  },
  {
    title: "Minecraft",
    genre: "Adventure",
    rating: "9.5",
    icon: "⛏️"
  },
  {
    title: "Elden Ring",
    genre: "RPG",
    rating: "9.7",
    icon: "⚔️"
  },
  {
    title: "Fortnite",
    genre: "Action",
    rating: "8.7",
    icon: "🎯"
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Adventure",
    rating: "9.8",
    icon: "🤠"
  }
];

const gameGrid = document.getElementById("gameGrid");
const search = document.getElementById("search");

function showGames(list) {
  if (!gameGrid) return;

  gameGrid.innerHTML = "";

  if (list.length === 0) {
    gameGrid.innerHTML = `
      <div class="empty">
        بازی‌ای پیدا نشد 😕
      </div>
    `;
    return;
  }

  list.forEach(game => {
    const card = document.createElement("div");

    card.className = "game-card";

    card.innerHTML = `
      <div class="game-icon">${game.icon}</div>
      <div class="game-info">
        <span class="game-genre">${game.genre}</span>
        <h3>${game.title}</h3>
        <div class="game-bottom">
          <span>⭐ ${game.rating}</span>
          <button class="play-btn">مشاهده</button>
        </div>
      </div>
    `;

    gameGrid.appendChild(card);
  });
}

showGames(games);

if (search) {
  search.addEventListener("input", () => {
    const text = search.value.trim().toLowerCase();

    const filtered = games.filter(game =>
      game.title.toLowerCase().includes(text) ||
      game.genre.toLowerCase().includes(text)
    );

    showGames(filtered);
  });
}

const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    if (filter === "همه") {
      showGames(games);
    } else {
      showGames(
        games.filter(game => game.genre === filter)
      );
    }
  });
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

const loginDemo = document.getElementById("loginDemo");

if (loginDemo) {
  loginDemo.addEventListener("click", () => {
    alert("بخش ورود و ثبت‌نام به‌زودی فعال می‌شود 🎮");
  });
}
