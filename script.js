const games = [
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    rating: "9.2",
    icon: "🌃",
    description: "یک ماجراجویی آینده‌نگرانه در شهری پر از راز."
  },
  {
    title: "Call of Duty",
    genre: "FPS",
    rating: "8.9",
    icon: "🎯",
    description: "وارد میدان نبرد شو و مهارت خودت را نشان بده."
  },
  {
    title: "Minecraft",
    genre: "Adventure",
    rating: "9.5",
    icon: "⛏️",
    description: "بساز، کشف کن و دنیای خودت را خلق کن."
  },
  {
    title: "Elden Ring",
    genre: "RPG",
    rating: "9.7",
    icon: "⚔️",
    description: "یک دنیای بزرگ و اسرارآمیز برای کشف کردن."
  },
  {
    title: "Fortnite",
    genre: "Action",
    rating: "8.7",
    icon: "🏆",
    description: "رقابت کن، بساز و آخرین بازیکن باقی‌مانده باش."
  },
  {
    title: "Red Dead Redemption 2",
    genre: "Adventure",
    rating: "9.8",
    icon: "🤠",
    description: "یک ماجراجویی بزرگ در غرب وحشی."
  },
  {
    title: "God of War",
    genre: "Action",
    rating: "9.6",
    icon: "🪓",
    description: "نبردی حماسی در دنیای اسطوره‌ها."
  },
  {
    title: "The Witcher 3",
    genre: "RPG",
    rating: "9.8",
    icon: "🐺",
    description: "در نقش یک شکارچی هیولا وارد یک دنیای بزرگ شو."
  }
];

const gameGrid = document.getElementById("gameGrid");
const search = document.getElementById("search");

let currentFilter = "همه";

function showGames(list) {
  if (!gameGrid) return;

  gameGrid.innerHTML = "";

  if (list.length === 0) {
    gameGrid.innerHTML = `
      <div class="empty">
        😕 بازی‌ای پیدا نشد
      </div>
    `;
    return;
  }

  list.forEach((game) => {
    const card = document.createElement("article");

    card.className = "game-card";

    card.innerHTML = `
      <div class="game-cover">
        <span class="game-icon">${game.icon}</span>
        <span class="rating">⭐ ${game.rating}</span>
      </div>

      <div class="game-info">
        <span class="game-genre">${game.genre}</span>

        <h3>${game.title}</h3>

        <p>${game.description}</p>

        <button class="play-btn" data-game="${game.title}">
          مشاهده بازی ↗
        </button>
      </div>
    `;

    gameGrid.appendChild(card);
  });

  document.querySelectorAll(".play-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.game;

      alert(
        "🎮 " +
        name +
        "\n\nصفحه اختصاصی این بازی به‌زودی اضافه می‌شود!"
      );
    });
  });
}

function updateGames() {
  const text = search
    ? search.value.trim().toLowerCase()
    : "";

  let result = games;

  if (currentFilter !== "همه") {
    result = result.filter(
      (game) => game.genre === currentFilter
    );
  }

  if (text) {
    result = result.filter(
      (game) =>
        game.title.toLowerCase().includes(text) ||
        game.genre.toLowerCase().includes(text)
    );
  }

  showGames(result);
}

showGames(games);

if (search) {
  search.addEventListener("input", updateGames);
}

const filterButtons = document.querySelectorAll(
  "[data-filter]"
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    updateGames();
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
    alert(
      "👤 بخش ورود و ثبت‌نام\n\nبه‌زودی فعال می‌شود!"
    );
  });
                      }
