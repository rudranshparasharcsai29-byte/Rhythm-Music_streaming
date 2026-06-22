const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const sheet = document.getElementById("player-sheet");
const sheetPanel = sheet.querySelector(".sheet-panel");
const miniPlayer = document.getElementById("mini-player");
const expandPlayer = document.getElementById("expand-player");
const collapsePlayer = document.getElementById("collapse-player");
const scrim = document.getElementById("sheet-scrim");
const seek = document.getElementById("seek");
const elapsed = document.getElementById("elapsed");
const remaining = document.getElementById("remaining");
const vinyl = document.getElementById("vinyl");
const waveform = document.getElementById("waveform");
const sheetPlay = document.getElementById("sheet-play");
const miniPlay = document.querySelector(".mini-play");
const favorites = [...document.querySelectorAll(".favorite")];
const chips = [...document.querySelectorAll(".chip")];
const libraryItems = [...document.querySelectorAll(".library-item")];
const libraryCount = document.getElementById("library-count");
const viewToggle = document.getElementById("view-toggle");
const libraryList = document.getElementById("library-list");
const searchInput = document.querySelector(".search-box input");

let isPlaying = true;
let isFavorite = true;
let touchStartY = 0;
let dragDistance = 0;
let vinylAnimation;
let progressTimer;

function setGreeting() {
  const hour = new Date().getHours();
  const greeting = document.getElementById("greeting");
  if (!greeting) return;

  if (hour < 12) {
    greeting.textContent = "Good morning";
  } else if (hour < 18) {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}

function iconUse(iconId) {
  return `<svg><use href="#${iconId}" /></svg>`;
}

function setActiveScreen(target) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === target);
  });

  navItems.forEach((item) => {
    const active = item.dataset.target === target;
    item.classList.toggle("active", active);
    item.setAttribute("aria-current", active ? "page" : "false");
  });

  if (window.location.hash.replace("#", "") !== target) {
    history.replaceState(null, "", `#${target}`);
  }
}

function openSheet() {
  sheet.classList.add("open");
  sheet.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", "#player");
}

function closeSheet() {
  sheet.classList.remove("open");
  sheet.setAttribute("aria-hidden", "true");
  sheetPanel.style.transform = "";
  document.body.style.overflow = "";
  const activeNav = navItems.find((item) => item.classList.contains("active"));
  history.replaceState(null, "", `#${activeNav?.dataset.target || "home"}`);
}

function updatePlayState() {
  const icon = isPlaying ? "i-pause" : "i-play";
  sheetPlay.innerHTML = iconUse(icon);
  miniPlay.innerHTML = iconUse(icon);
  sheetPlay.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  miniPlay.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  vinyl.classList.toggle("rotating", isPlaying);
  vinyl.classList.toggle("paused", !isPlaying);
  waveform.classList.toggle("paused", !isPlaying);
  syncVinylMotion();
  syncPlaybackProgress();
}

function updateFavoriteState() {
  favorites.forEach((button) => {
    button.classList.toggle("active", isFavorite);
    button.innerHTML = iconUse(isFavorite ? "i-heart" : "i-heart-outline");
  });
}

function formatTime(value) {
  const total = Math.max(0, Number(value) || 0);
  const minutes = Math.floor(total / 60);
  const seconds = Math.floor(total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateSeek() {
  const value = Number(seek.value);
  const max = Number(seek.max);
  seek.style.setProperty("--seek", `${(value / max) * 100}%`);
  elapsed.textContent = formatTime(value);
  remaining.textContent = formatTime(max - value);
}

function syncPlaybackProgress() {
  window.clearInterval(progressTimer);
  if (!isPlaying) return;

  progressTimer = window.setInterval(() => {
    const nextValue = (Number(seek.value) + 1) % (Number(seek.max) + 1);
    seek.value = nextValue;
    updateSeek();
  }, 1000);
}

function filterLibrary(kind) {
  let visible = 0;
  libraryItems.forEach((item) => {
    const show = kind === "all" || item.dataset.kind === kind;
    item.hidden = !show;
    if (show) visible += 1;
  });
  libraryCount.textContent = `${visible} saved ${visible === 1 ? "item" : "items"}`;
}

function setChipFilter(activeChip) {
  chips.forEach((chip) => chip.classList.toggle("active", chip === activeChip));
  filterLibrary(activeChip.dataset.filter);
}

function bindSearch() {
  const tiles = [...document.querySelectorAll(".category-tile")];
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.trim().toLowerCase();
    tiles.forEach((tile) => {
      const label = tile.querySelector("strong").textContent.toLowerCase();
      tile.hidden = Boolean(term) && !label.includes(term);
    });
  });
}

function bindSheetDrag() {
  sheetPanel.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
    dragDistance = 0;
    sheetPanel.style.transition = "none";
  }, { passive: true });

  sheetPanel.addEventListener("touchmove", (event) => {
    dragDistance = Math.max(0, event.touches[0].clientY - touchStartY);
    if (dragDistance > 0) {
      sheetPanel.style.transform = `translateY(${dragDistance}px)`;
    }
  }, { passive: true });

  sheetPanel.addEventListener("touchend", () => {
    sheetPanel.style.transition = "";
    if (dragDistance > 95) {
      closeSheet();
    } else {
      sheetPanel.style.transform = "";
    }
  });
}

function initVinylMotion() {
  if (typeof vinyl.animate !== "function") return;

  vinylAnimation = vinyl.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 2400, iterations: Infinity, easing: "linear" }
  );
  vinylAnimation.pause();
}

function syncVinylMotion() {
  if (!vinylAnimation) return;

  if (isPlaying) {
    vinylAnimation.playbackRate = 1;
    vinylAnimation.play();
    return;
  }

  const startRate = typeof vinylAnimation.playbackRate === "number" ? vinylAnimation.playbackRate : 1;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min(1, (now - start) / 420);
    const eased = 1 - (1 - progress) * (1 - progress);
    vinylAnimation.playbackRate = Math.max(0.01, startRate * (1 - eased));
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      vinylAnimation.pause();
      vinylAnimation.playbackRate = 1;
    }
  };

  requestAnimationFrame(step);
}

function applyInitialHash() {
  const hash = window.location.hash.replace("#", "");
  if (["home", "search", "library"].includes(hash)) {
    setActiveScreen(hash);
  }

  if (hash === "player") {
    openSheet();
  } else if (sheet.classList.contains("open")) {
    closeSheet();
  }
}

navItems.forEach((item) => {
  item.addEventListener("click", () => setActiveScreen(item.dataset.target));
});

expandPlayer.addEventListener("click", openSheet);
collapsePlayer.addEventListener("click", closeSheet);
scrim.addEventListener("click", closeSheet);

[sheetPlay, miniPlay].forEach((button) => {
  button.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayState();
  });
});

favorites.forEach((button) => {
  button.addEventListener("click", () => {
    isFavorite = !isFavorite;
    updateFavoriteState();
  });
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => setChipFilter(chip));
});

viewToggle.addEventListener("click", () => {
  const grid = libraryList.classList.toggle("grid-view");
  viewToggle.innerHTML = iconUse(grid ? "i-list" : "i-grid");
  viewToggle.setAttribute("aria-label", grid ? "Switch to list view" : "Switch to grid view");
});

seek.addEventListener("input", updateSeek);

window.addEventListener("hashchange", applyInitialHash);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sheet.classList.contains("open")) {
    closeSheet();
  }
});

setGreeting();
updateSeek();
initVinylMotion();
updatePlayState();
updateFavoriteState();
filterLibrary("all");
bindSearch();
bindSheetDrag();
applyInitialHash();
