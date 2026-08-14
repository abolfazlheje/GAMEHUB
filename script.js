const games = [
  {
    title: "Cyberpunk 2077",
    genre: "RPG",
    rating: "9.2",
    icon: "🎮",
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
    rating: "9.0",
    icon: "⛏️",
    description:
      "بساز، کاوش کن و دنیای خودت را با خلاقیتت شکل بده."
  },
  {
    title: "FIFA",
    genre: "Sports",
    rating: "8.7",
    icon: "⚽",
    description:
      "وارد زمین شو و یک مسابقه هیجان‌انگیز فوتبال را تجربه کن."
  }
];


/* =====================================================
   ساخت صفحه اختصاصی بازی
===================================================== */

function openGamePage(game) {

  // اگر صفحه‌ای از قبل باز است، حذفش کن
  const oldPage = document.getElementById("game-page");

  if (oldPage) {
    oldPage.remove();
  }

  // ساخت صفحه
  const page = document.createElement("div");

  page.id = "game-page";

  page.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: #09070d;
    color: white;
    overflow-y: auto;
    direction: rtl;
    font-family: Arial, sans-serif;
    padding: 30px 20px 60px;
  `;


  page.innerHTML = `

    <div style="
      max-width:800px;
      margin:auto;
      text-align:center;
    ">

      <div style="
        font-size:90px;
        margin-top:20px;
        margin-bottom:20px;
      ">
        ${game.icon}
      </div>


      <div style="
        color:#a855f7;
        font-size:18px;
        margin-bottom:10px;
      ">
        ${game.genre}
      </div>


      <h1 style="
        font-size:40px;
        margin:10px 0 20px;
      ">
        ${game.title}
      </h1>


      <div style="
        font-size:24px;
        margin-bottom:20px;
      ">
        ⭐ ${game.rating} / 10
      </div>


      <p style="
        font-size:20px;
        line-height:2;
        color:#d1d1d1;
        margin-bottom:30px;
      ">
        ${game.description}
      </p>


      <div style="
        background:#15101c;
        border:1px solid #30223d;
        border-radius:20px;
        padding:25px;
        margin-bottom:30px;
      ">

        <div style="
          font-size:18px;
          margin-bottom:10px;
        ">
          <strong>ژانر:</strong>
          ${game.genre}
        </div>


        <div style="
          font-size:18px;
          margin-bottom:10px;
        ">
          <strong>امتیاز:</strong>
          ${game.rating} / 10
        </div>


        <div style="
          font-size:18px;
        ">
          <strong>وضعیت:</strong>
          فعال
        </div>

      </div>


      <div style="
        display:flex;
        gap:15px;
        justify-content:center;
        flex-wrap:wrap;
      ">

        <button
          id="play-game"
          style="
            border:none;
            background:#8b3dff;
            color:white;
            padding:15px 30px;
            border-radius:12px;
            font-size:18px;
            cursor:pointer;
          "
        >
          🎮 شروع بازی
        </button>


        <button
          id="back-game"
          style="
            border:1px solid #8b3dff;
            background:transparent;
            color:white;
            padding:15px 30px;
            border-radius:12px;
            font-size:18px;
            cursor:pointer;
          "
        >
          ← بازگشت به بازی‌ها
        </button>

      </div>


      <div
        id="game-area"
        style="
          display:none;
          margin-top:30px;
          background:#120d18;
          border:1px solid #30223d;
          border-radius:20px;
          padding:25px;
        "
      >

        <h2>🎮 بازی شروع شد!</h2>

        <p id="game-message">
          برای شروع روی دکمه زیر بزن.
        </p>

        <button
          id="game-action"
          style="
            border:none;
            background:#a855f7;
            color:white;
            padding:14px 25px;
            border-radius:10px;
            font-size:18px;
            cursor:pointer;
          "
        >
          شروع
        </button>

        <div
          id="game-score"
          style="
            margin-top:20px;
            font-size:22px;
          "
        >
          امتیاز: 0
        </div>

      </div>

    </div>
  `;


  document.body.appendChild(page);

  // جلوگیری از اسکرول صفحه اصلی
  document.body.style.overflow = "hidden";


  /* =====================================================
     دکمه شروع بازی
  ===================================================== */

  const playGame = document.getElementById("play-game");

  if (playGame) {

    playGame.addEventListener("click", () => {

      const gameArea = document.getElementById("game-area");

      if (gameArea) {
        gameArea.style.display = "block";
      }

      const message = document.getElementById("game-message");

      if (message) {
        message.textContent =
          `🎮 ${game.title} شروع شد! روی «بازی کن» بزن و امتیاز بگیر.`;
      }

      const action = document.getElementById("game-action");

      if (action) {
        action.textContent = "🎯 بازی کن";
      }

    });

  }


  /* =====================================================
     دکمه بازی
  ===================================================== */

  const actionButton = document.getElementById("game-action");

  let score = 0;

  if (actionButton) {

    actionButton.addEventListener("click", () => {

      score += Math.floor(Math.random() * 10) + 1;

      const scoreElement =
        document.getElementById("game-score");

      const message =
        document.getElementById("game-message");

      if (scoreElement) {
        scoreElement.textContent =
          `امتیاز: ${score}`;
      }

      if (message) {
        message.textContent =
          "🔥 عالی بود! دوباره بازی کن تا امتیازت بیشتر شود.";
      }

    });

  }


  /* =====================================================
     دکمه بازگشت
  ===================================================== */

  const backGame = document.getElementById("back-game");

  if (backGame) {

    backGame.addEventListener("click", closeGamePage);

  }


  /* =====================================================
     بستن با Escape
  ===================================================== */

  document.addEventListener(
    "keydown",
    gameEscapeHandler
  );

}


/* =====================================================
   بستن صفحه بازی
===================================================== */

function closeGamePage() {

  const page =
    document.getElementById("game-page");

  if (page) {
    page.remove();
  }

  document.body.style.overflow = "";

  document.removeEventListener(
    "keydown",
    gameEscapeHandler
  );

}


/* =====================================================
   کلید Escape
===================================================== */

function gameEscapeHandler(event) {

  if (event.key === "Escape") {
    closeGamePage();
  }

}


/* =====================================================
   تشخیص کلیک روی بازی‌ها
===================================================== */

document.addEventListener("click", function(event) {

  const card =
    event.target.closest(".game-card");

  if (!card) {
    return;
  }


  /*
    اگر خود کارت data-game-index داشته باشد،
    همان بازی را باز می‌کنیم.
  */

  const index =
    Number(card.dataset.gameIndex);


  if (
    !Number.isNaN(index) &&
    games[index]
  ) {

    openGamePage(games[index]);

    return;
  }


  /*
    اگر data-game-index وجود نداشت،
    عنوان بازی را از کارت می‌خوانیم.
  */

  const titleElement =
    card.querySelector("h2") ||
    card.querySelector("h3") ||
    card.querySelector(".game-title");


  if (!titleElement) {
    return;
  }


  const title =
    titleElement.textContent.trim();


  const game =
    games.find(function(item) {

      return item.title.toLowerCase() ===
        title.toLowerCase();

    });


  if (game) {
    openGamePage(game);
  }

});


/* =====================================================
   اضافه کردن شماره بازی به کارت‌ها
===================================================== */

function setupGameCards() {

  const cards =
    document.querySelectorAll(".game-card");


  cards.forEach(function(card, index) {

    if (!card.dataset.gameIndex) {

      card.dataset.gameIndex =
        String(index);

    }

    card.style.cursor = "pointer";

  });

}


/* =====================================================
   فیلتر بازی‌ها
===================================================== */

document.addEventListener("click", function(event) {

  const button =
    event.target.closest("[data-genre]");

  if (!button) {
    return;
  }


  const genre =
    button.dataset.genre;


  const cards =
    document.querySelectorAll(".game-card");


  cards.forEach(function(card) {

    if (
      genre === "all" ||
      !genre
    ) {

      card.style.display = "";

      return;

    }


    const cardGenreElement =
      card.querySelector(".game-category") ||
      card.querySelector(".game-genre");


    if (!cardGenreElement) {
      return;
    }


    const cardGenre =
      cardGenreElement.textContent.trim();


    if (
      cardGenre.toLowerCase() ===
      genre.toLowerCase()
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

});


/* =====================================================
   اجرای اولیه
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    setupGameCards();

  }
);


/* اگر DOM از قبل آماده شده باشد */
if (
  document.readyState === "interactive" ||
  document.readyState === "complete"
) {

  setupGameCards();

}


console.log(
  "GAMEHUB SCRIPT READY"
);
