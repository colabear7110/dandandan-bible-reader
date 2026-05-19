const DEFAULT_PLAYLIST_ID = "PLhp7wkPuMcoQHX7KhDqK2fK4MtXpkfTiQ";
const STORAGE_PREFIX = "dandandan-v3";
const PROGRAM_YEAR = 2026;
const GROUPED_RANGES = [
  { id: "old-testament-review", label: "구약 정리", start: "9-7", end: "9-13" },
  { id: "new-testament-prep", label: "신약 준비", start: "9-14", end: "9-20" },
  { id: "final-review", label: "종합 복습", start: "12-18", end: "12-31" },
];

const monthReadings = {
  1: ["창 1-3", "창 4-7", "창 8-12", "창 13-15", "창 16-18", "창 19-21", "창 22-24", "창 25-27", "창 28-31", "창 32-35", "창 36-39", "창 40-42", "창 43-45", "창 46-48", "창 49-출 1", "출 2-4", "출 5-7", "출 8-11", "출 12-14", "출 15-17", "출 18-20", "출 21-23", "출 24-26", "출 27-29", "출 30-32", "출 33-35", "출 36-38", "출 39-레 1", "레 2-4", "레 5-7", "레 8-10"],
  2: ["레 11-13", "레 14-16", "레 17-19", "레 20-22", "레 23-25", "레 26-민 1", "민 2-4", "민 5-6", "민 7-9", "민 10-12", "민 13-15", "민 16-18", "민 19-21", "민 22-24", "민 25-27", "민 28-30", "민 31-33", "민 34-36", "신 1-3", "신 4-6", "신 7-9", "신 10-12", "신 13-16", "신 17-19", "신 20-23", "신 24-26", "신 27-30", "신 31-34"],
  3: ["수 1-4", "수 5-7", "수 8-10", "수 11-14", "수 15-18", "수 19-21", "수 22-24", "삿 1-3", "삿 4-7", "삿 8-11", "삿 12-15", "삿 16-19", "삿 20-룻 1", "룻 2-4", "삼상 1-4", "삼상 5-8", "삼상 9-12", "삼상 13-16", "삼상 17-20", "삼상 21-24", "삼상 25-28", "삼상 29-31", "삼하 1-4", "삼하 5-7", "삼하 8-11", "삼하 12-15", "삼하 16-18", "삼하 19-21", "삼하 22-24", "왕상 1-2", "왕상 3-5"],
  4: ["왕상 6-7", "왕상 8-9", "왕상 10-11", "왕상 12-14", "왕상 15-17", "왕상 18-19", "왕상 20-22", "왕하 1-3", "왕하 4-6", "왕하 7-9", "왕하 10-13", "왕하 14-17", "왕하 18-20", "왕하 21-23", "왕하 24-25", "대상 1-4", "대상 5-8", "대상 9-14", "대상 15-20", "대상 21-25", "대상 26-29", "대하 1-6", "대하 7-11", "대하 12-16", "대하 17-18", "대하 19-21", "대하 22-25", "대하 26-29", "대하 30-32", "대하 33-36"],
  5: ["스 1-3", "스 4-6", "스 7-10", "느 1-4", "느 5-7", "느 8-10", "느 11-13", "에 1-3", "에 4-7", "에 8-10", "시 1-5", "시 6-10", "시 11-17", "시 18-24", "시 25-31", "시 32-34", "시 35-38", "시 39-43", "시 44-48", "시 49-54", "시 55-60", "시 61-66", "시 67-72", "시 73-77", "시 78-83", "시 84-89", "시 90-95", "시 96-100", "시 101-106", "시 107-111", "시 112-118"],
  6: ["시 119", "시 120-129", "시 130-139", "시 140-150", "잠 1-4", "잠 5-9", "잠 10-13", "잠 14-17", "잠 18-21", "잠 22-24", "잠 25-28", "잠 29-31", "전 1-4", "전 5-8", "전 9-12", "아 1-5", "아 6-8", "욥 1-4", "욥 5-9", "욥 10-13", "욥 14-18", "욥 19-21", "욥 22-25", "욥 26-28", "욥 29-32", "욥 33-35", "욥 36-38", "욥 39-42", "사 1-4", "사 5-8"],
  7: ["사 9-11", "사 12-14", "사 15-17", "사 18-20", "사 21-23", "사 24-28", "사 29-33", "사 34-37", "사 38-42", "사 43-46", "사 47-50", "사 51-53", "사 54-58", "사 59-62", "사 63-66", "렘 1-4", "렘 5-8", "렘 9-12", "렘 13-16", "렘 17-20", "렘 21-24", "렘 25-28", "렘 29-32", "렘 33-36", "렘 37-40", "렘 41-44", "렘 45-47", "렘 48-50", "렘 51-애 1", "애 2-4", "애 5-겔 2"],
  8: ["겔 3-5", "겔 6-7", "겔 8-11", "겔 12-15", "겔 16-18", "겔 19-21", "겔 22-24", "겔 25-27", "겔 28-30", "겔 31-33", "겔 34-36", "겔 37-39", "겔 40-42", "겔 43-45", "겔 46-48", "단 1-2", "단 3-5", "단 6-8", "단 9-11", "단 12-호 2", "호 3-5", "호 6-8", "호 9-10", "호 11-14", "욜 1-암 2", "암 3-7", "암 8-욘 2", "욘 3-미 2", "미 3-7", "나 1-3", "합 1-3"],
  9: ["습 1-3", "학 1-슥 2", "슥 3-6", "슥 7-10", "슥 11-14", "말 1-4", "구약 정리", "구약 정리", "구약 정리", "구약 정리", "구약 정리", "구약 정리", "구약 정리", "신약 준비", "신약 준비", "신약 준비", "신약 준비", "신약 준비", "신약 준비", "신약 준비", "마 1", "마 2:1-12", "마 2:13-23", "마 3:1-12", "마 3:13-17", "마 4:1-11", "마 4:12-25", "마 5", "마 6", "마 7"],
  10: ["마 8", "마 9-10", "마 11-12", "마 13", "마 14-16", "마 17-19", "마 20-22", "마 23-25", "마 26-28", "막 1-3", "막 4-6", "막 7-9", "막 10-12", "막 13-16", "눅 1-3", "눅 4-6", "눅 7-9", "눅 10-12", "눅 13-15", "눅 16-18", "눅 19-22", "눅 23-요 1", "요 2-4", "요 5-7", "요 8-10", "요 11-13", "요 14-16", "요 17-19", "요 20-행 1", "행 2-4", "행 5-7"],
  11: ["행 8-11", "행 12-14", "행 15-17", "행 18-20", "행 21-24", "행 25-28", "롬 1-3", "롬 4-6", "롬 7-10", "롬 11-14", "롬 15-고전 2", "고전 3-6", "고전 7-10", "고전 11-13", "고전 14-16", "고후 1-4", "고후 5-8", "고후 9-12", "고후 13-갈 2", "갈 3-6", "엡 1-3", "엡 4-6", "빌 1-4", "골 1-4", "살전 1-5", "살후 1-딤전 3", "딤전 4-딤후 4", "딛-몬", "히 1-4", "히 5-7"],
  12: ["히 8-10", "히 11-13", "약 1-5", "벧전 1-3", "벧전 4-5", "벧후 1-3", "요일 1-5", "요이-삼-유", "계 1-4", "계 5-8", "계 9-12", "계 13-16", "계 17-18", "계 19", "계 20", "계 21", "계 22", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "종합 복습", "", "", "", ""],
};

const readings = Object.entries(monthReadings).flatMap(([month, ranges]) =>
  ranges.map((range, dayIndex) => {
    const date = new Date(PROGRAM_YEAR, Number(month) - 1, dayIndex + 1);
    const dayOfYear = Math.floor((date - new Date(PROGRAM_YEAR, 0, 1)) / 86400000) + 1;
    const label = range || "쉼";

    return {
      day: dayOfYear,
      date,
      title: `${Number(month)}월 ${dayIndex + 1}일`,
      range: label,
      completionId: getCompletionId(date),
    };
  }),
);

function dateKey(month, day) {
  return `${month}-${day}`;
}

function getDateKey(date) {
  return dateKey(date.getMonth() + 1, date.getDate());
}

function dateKeyToDayOfYear(key) {
  const [month, day] = key.split("-").map(Number);
  const date = new Date(PROGRAM_YEAR, month - 1, day);

  return Math.floor((date - new Date(PROGRAM_YEAR, 0, 1)) / 86400000) + 1;
}

function getCompletionId(date) {
  const dayOfYear = Math.floor((date - new Date(PROGRAM_YEAR, 0, 1)) / 86400000) + 1;
  const group = GROUPED_RANGES.find(
    (range) => dayOfYear >= dateKeyToDayOfYear(range.start) && dayOfYear <= dateKeyToDayOfYear(range.end),
  );

  return group ? rangeKey(group.id) : getDateKey(date);
}

function rangeKey(id) {
  return `group:${id}`;
}

function getGroupForReading(reading) {
  return GROUPED_RANGES.find((range) => reading.completionId === rangeKey(range.id));
}

function getCompletionUnits() {
  return new Set(readings.map((reading) => reading.completionId));
}

function getDefaultIndex() {
  const dateParam = new URLSearchParams(window.location.search).get("date");
  const dateMatch = dateParam?.match(/^(\d{1,2})-(\d{1,2})$/);
  if (dateMatch) {
    const month = Number(dateMatch[1]);
    const day = Number(dateMatch[2]);
    const index = readings.findIndex(
      (reading) => reading.date.getMonth() + 1 === month && reading.date.getDate() === day,
    );

    if (index >= 0) return index;
  }

  const today = new Date();
  if (today.getFullYear() !== PROGRAM_YEAR) return 0;

  return Math.floor((today - new Date(PROGRAM_YEAR, 0, 1)) / 86400000);
}

function getInitialIndex() {
  const dateParam = new URLSearchParams(window.location.search).get("date");
  if (dateParam) return getDefaultIndex();

  return Number(localStorage.getItem(`${STORAGE_PREFIX}-current-index`) || getDefaultIndex());
}

const state = {
  currentIndex: getInitialIndex(),
  playlistId: localStorage.getItem(`${STORAGE_PREFIX}-playlist-id`) || DEFAULT_PLAYLIST_ID,
  completed: new Set(JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}-completed`) || "[]")),
  filter: "",
};

const player = document.querySelector("#youtubePlayer");
const todayTitle = document.querySelector("#todayTitle");
const dayPosition = document.querySelector("#dayPosition");
const prevDay = document.querySelector("#prevDay");
const todayDay = document.querySelector("#todayDay");
const nextDay = document.querySelector("#nextDay");
const completeToday = document.querySelector("#completeToday");
const playlistList = document.querySelector("#playlistList");
const progressText = document.querySelector("#progressText");
const progressCount = document.querySelector("#progressCount");
const progressFill = document.querySelector("#progressFill");
const completeBeforeToday = document.querySelector("#completeBeforeToday");
const searchInput = document.querySelector("#searchInput");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsToggle = document.querySelector("#settingsToggle");
const connectPlaylist = document.querySelector("#connectPlaylist");
const emptyPlayer = document.querySelector("#emptyPlayer");
const openYoutube = document.querySelector("#openYoutube");
const playlistInput = document.querySelector("#playlistInput");
const saveSettings = document.querySelector("#saveSettings");

function extractPlaylistId(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    return url.searchParams.get("list") || trimmed;
  } catch {
    return trimmed;
  }
}

function saveState() {
  localStorage.setItem(`${STORAGE_PREFIX}-current-index`, String(state.currentIndex));
  localStorage.setItem(`${STORAGE_PREFIX}-playlist-id`, state.playlistId);
  localStorage.setItem(`${STORAGE_PREFIX}-completed`, JSON.stringify([...state.completed]));
}

function isCompleted(reading) {
  return state.completed.has(reading.completionId);
}

function getEmbedUrl() {
  const videoId = getCurrentVideoId();
  if (videoId) {
    const params = new URLSearchParams({
      rel: "0",
      origin: window.location.origin,
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  }

  return "";
}

function getYoutubeUrl() {
  const videoId = getCurrentVideoId();
  if (videoId) {
    const params = new URLSearchParams({
      v: videoId,
      list: state.playlistId,
    });

    return `https://www.youtube.com/watch?${params.toString()}`;
  }

  const params = new URLSearchParams({
    list: state.playlistId,
    index: String(state.currentIndex + 1),
  });

  return `https://www.youtube.com/playlist?${params.toString()}`;
}

function getCurrentVideoId() {
  const reading = readings[state.currentIndex];
  const key = getDateKey(reading.date);

  return window.VIDEO_BY_DATE?.[key] || "";
}

function setDay(index) {
  state.currentIndex = Math.max(0, Math.min(readings.length - 1, index));
  saveState();
  render();
}

function scrollToPlayer() {
  document.querySelector(".player-panel")?.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
}

function toggleCompleted(day) {
  const reading = readings.find((entry) => entry.day === day);
  if (!reading) return;

  const key = reading.completionId;
  if (state.completed.has(key)) {
    state.completed.delete(key);
  } else {
    state.completed.add(key);
  }
  saveState();
  render();
}

function completeUntilToday() {
  const todayIndex = getDefaultIndex();
  const currentYear = new Date().getFullYear();
  const lastIndex = currentYear === PROGRAM_YEAR ? todayIndex : state.currentIndex;

  readings.slice(0, lastIndex).forEach((reading) => {
    state.completed.add(reading.completionId);
  });

  saveState();
  render();
}

function renderProgress() {
  const units = getCompletionUnits();
  const completedCount = [...units].filter((unit) => state.completed.has(unit)).length;
  const percent = Math.round((completedCount / units.size) * 100);
  progressText.textContent = `${percent}%`;
  progressCount.textContent = `${completedCount}개 완료`;
  progressFill.style.width = `${percent}%`;
}

function renderList() {
  const visibleReadings = readings.filter((reading, index) => {
    const previous = readings[index - 1];
    return !previous || previous.completionId !== reading.completionId;
  });
  const filtered = visibleReadings.filter((reading) => {
    const text = `${reading.day} ${reading.title} ${reading.range}`;
    return text.includes(state.filter);
  });

  playlistList.innerHTML = "";

  filtered.forEach((reading) => {
    const item = document.createElement("button");
    const originalIndex = readings.findIndex((entry) => entry.day === reading.day);
    const done = isCompleted(reading);
    const group = getGroupForReading(reading);
    const groupLabel = group ? getGroupLabel(group) : "";

    item.type = "button";
    item.className = `day-item${done ? " done" : ""}${group ? " grouped" : ""}`;
    item.dataset.index = String(originalIndex);
    item.setAttribute("aria-current", String(isCurrentReading(reading)));
    item.innerHTML = `
      <span class="check" aria-hidden="true">✓</span>
      <span>
        <strong>${groupLabel || reading.title}</strong>
        <span>${group ? reading.range : reading.range}</span>
      </span>
    `;
    item.addEventListener("click", () => {
      setDay(originalIndex);
      scrollToPlayer();
    });
    playlistList.appendChild(item);
  });

  if (!state.filter) {
    const activeItem = playlistList.querySelector('[aria-current="true"]');
    if (activeItem) {
      playlistList.scrollTop = activeItem.offsetTop - playlistList.clientHeight / 2 + activeItem.clientHeight / 2;
    }
  }
}

function render() {
  const reading = readings[state.currentIndex];
  const group = getGroupForReading(reading);
  const hasVideo = Boolean(getCurrentVideoId());
  player.src = state.playlistId && hasVideo ? getEmbedUrl() : "";
  emptyPlayer.style.display = state.playlistId && hasVideo ? "none" : "grid";
  emptyPlayer.querySelector("strong").textContent = getEmptyPlayerText(reading, group);
  connectPlaylist.style.display = state.playlistId ? "none" : "inline-block";
  openYoutube.href = state.playlistId ? getYoutubeUrl() : "#";
  openYoutube.style.display = state.playlistId && hasVideo ? "inline-block" : "none";
  todayTitle.textContent = `${group ? getGroupLabel(group) : reading.title} · ${reading.range}`;
  dayPosition.textContent = `${state.currentIndex + 1} / ${readings.length}`;
  prevDay.disabled = state.currentIndex === 0;
  nextDay.disabled = state.currentIndex === readings.length - 1;
  completeToday.textContent = isCompleted(reading) ? "완료 취소" : "봤어요";
  playlistInput.value = state.playlistId;
  renderProgress();
  renderList();
}

function getGroupLabel(group) {
  return `${group.start.replace("-", "월 ")}일-${group.end.split("-")[1]}일`;
}

function getEmptyPlayerText(reading, group) {
  if (!state.playlistId) return "교회 유튜브 재생목록을 연결해 주세요";
  if (group) return "이 구간은 별도 영상이 없어요";

  return `${reading.title} 영상은 아직 준비 중이에요`;
}

function isCurrentReading(reading) {
  return readings[state.currentIndex]?.completionId === reading.completionId;
}

prevDay.addEventListener("click", () => setDay(state.currentIndex - 1));
todayDay.addEventListener("click", () => {
  setDay(getDefaultIndex());
  searchInput.value = "";
  state.filter = "";
  scrollToPlayer();
});
nextDay.addEventListener("click", () => setDay(state.currentIndex + 1));
completeToday.addEventListener("click", () => toggleCompleted(readings[state.currentIndex].day));
completeBeforeToday.addEventListener("click", completeUntilToday);

searchInput.addEventListener("input", (event) => {
  state.filter = event.target.value.trim();
  renderList();
});

settingsToggle.addEventListener("click", () => {
  settingsDialog.showModal();
});

connectPlaylist.addEventListener("click", () => {
  settingsDialog.showModal();
});

saveSettings.addEventListener("click", () => {
  const nextPlaylistId = extractPlaylistId(playlistInput.value);
  if (nextPlaylistId) {
    state.playlistId = nextPlaylistId;
    saveState();
    render();
  }
  settingsDialog.close();
});

render();
