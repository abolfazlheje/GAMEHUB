const games = [
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    rating: "9.2",
    icon: "🌆",
    description:
      "یک ماجراجویی آینده‌نگرانه در شهری پر از فناوری و اتفاقات هیجان‌انگیز."
  },
  {
    title: "Call of Duty",
    genre: "FPS",
    rating: "8.9",
    icon: "🎯",
    description:
      "وارد میدان نبرد شو و مهارت‌های خودت را به نمایش بگذار."
  },
  {
    title: "Minecraft",
    genre: "Adventure",
    rating: "9.5",
    icon: "⛏️",
    description:
      "دنیایی بزرگ برای ساختن، کشف کردن و ماجراجویی."
  },
  {
    title: "EA Sports FC",
    genre: "Sports",
    rating: "9.0",
    icon: "⚽",
    description:
      "تجربه یک مسابقه فوتبالی هیجان‌انگیز با تیم مورد علاقه‌ات."
  }
];


// ===============================
// منوی سه خط
// ===============================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}


// ===============================
// ورود / ثبت نام
// ===============================

const loginDemo = document.getElementById("loginDemo");

if (loginDemo) {
  loginDemo.addEventListener("click", () => {
    alert("👤 بخش ورود و ثبت‌نام به‌زودی فعال می‌شود!");
  });
}


// ===============================
// فیلتر بازی‌ها
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.filter;

    document.querySelectorAll(".game-card").forEach((card) => {

      const genre = card.dataset.genre;

      if (category === "all" || genre === category) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });
  });
});


// ===============================
// صفحه اختصاصی بازی
// ===============================

function openGamePage(game) {

  const oldPage = document.getElementById("gamePage");

  if (oldPage) {
    oldPage.remove();
  }

  const page = document.createElement("div");

  page.id = "gamePage";

  page.innerHTML = `
    <div class="game-page-overlay">

      <div class="game-page">

        <button class="game-close" id="closeGame">
          ✕
        </button>

        <div class="game-big-icon">
          ${game.icon}
        </div>

        <div class="game-page-category">
          ${game.genre}
        </div>

        <h1>
          ${game.title}
        </h1>

        <div class="game-rating">
          ⭐ ${game.rating}
        </div>

        <p class="game-description">
          ${game.description}
        </p>

        <div class="game-info">

          <div>
            <strong>ژانر</strong>
            <span>${game.genre}</span>
          </div>

          <div>
            <strong>امتیاز</strong>
            <span>${game.rating} / 10</span>
          </div>

          <div>
            <strong>وضعیت</strong>
            <span>فعال</span>
          </div>

        </div>

        <button class="play-button" id="playGame">
          🎮 شروع بازی
        </button>

        <button class="back-button" id="backGame">
          ← بازگشت به بازی‌ها
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(page);

  document.body.style.overflow = "hidden";


  // بستن صفحه
  const closeGame = document.getElementById("closeGame");
  const backGame = document.getElementById("backGame");

  function closePage() {
    page.remove();
    document.body.style.overflow = "";
  }

  closeGame.addEventListener("click", closePage);
  backGame.addEventListener("click", closePage);


  // دکمه شروع بازی
  const playGame = document.getElementById("playGame");

  playGame.addEventListener("click", () => {
    alert(
      `🎮 ${game.title}\n\nصفحه بازی آماده است و در مرحله بعد می‌توانیم خود بازی را به این قسمت اضافه کنیم.`
    );
  });
}


// ===============================
// تشخیص کلیک روی بازی‌ها
// ===============================

document.addEventListener("click", (event) => {

  const card = event.target.closest(".game-card");

  if (!card) {
    return;
  }

  const index = Number(card.dataset.gameIndex);

  if (!isNaN(index) && games[index]) {
    openGamePage(games[index]);
    return;
  }

  const titleElement =
    card.querySelector("h2") ||
    card.querySelector("h3") ||
    card.querySelector(".game-title");

  if (titleElement) {

    const title = titleElement.textContent.trim();

    const game = games.find((item) => item.title === title);

    if (game) {
      openGamePage(game);
    }
  }
});


// ===============================
// ESC برای بستن صفحه بازی
// ===============================

document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {

    const page = document.getElementById("gamePage");

    if (page) {
      page.remove();
      document.body.style.overflow = "";
    }

  }

}); 
