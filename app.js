const DEFAULT_PLAYLIST_ID = "PLhp7wkPuMcoQHX7KhDqK2fK4MtXpkfTiQ";
const STORAGE_PREFIX = "dandandan-v3";
const PROGRAM_YEAR = 2026;
const GROUPED_RANGES = [
  { id: "old-testament-review", label: "구약 정리", start: "9-7", end: "9-13" },
  { id: "new-testament-prep", label: "신약 준비", start: "9-14", end: "9-20" },
  { id: "final-review", label: "종합 복습", start: "12-18", end: "12-31" },
];
const BOOK_ALIASES = {
  창세기: "창",
  출애굽기: "출",
  레위기: "레",
  민수기: "민",
  신명기: "신",
  여호수아: "수",
  사사기: "삿",
  룻기: "룻",
  사무엘상: "삼상",
  사무엘하: "삼하",
  열왕기상: "왕상",
  열왕기하: "왕하",
  역대상: "대상",
  역대하: "대하",
  에스라: "스",
  느헤미야: "느",
  에스더: "에",
  욥기: "욥",
  시편: "시",
  잠언: "잠",
  전도서: "전",
  아가: "아",
  이사야: "사",
  예레미야: "렘",
  예레미야애가: "애",
  에스겔: "겔",
  다니엘: "단",
  호세아: "호",
  요엘: "욜",
  아모스: "암",
  오바댜: "옵",
  요나: "욘",
  미가: "미",
  나훔: "나",
  하박국: "합",
  스바냐: "습",
  학개: "학",
  스가랴: "슥",
  말라기: "말",
  마태복음: "마",
  마가복음: "막",
  누가복음: "눅",
  요한복음: "요",
  사도행전: "행",
  로마서: "롬",
  고린도전서: "고전",
  고린도후서: "고후",
  갈라디아서: "갈",
  에베소서: "엡",
  빌립보서: "빌",
  골로새서: "골",
  데살로니가전서: "살전",
  데살로니가후서: "살후",
  디모데전서: "딤전",
  디모데후서: "딤후",
  디도서: "딛",
  빌레몬서: "몬",
  히브리서: "히",
  야고보서: "약",
  베드로전서: "벧전",
  베드로후서: "벧후",
  요한1서: "요일",
  요한2서: "요이",
  요한3서: "요삼",
  유다서: "유",
  요한계시록: "계",
};
const BOOK_ENTRIES = Object.entries(BOOK_ALIASES).sort(([, firstAlias], [, secondAlias]) => secondAlias.length - firstAlias.length);
const BOOK_NAME_ENTRIES = Object.entries(BOOK_ALIASES).sort(([firstBook], [secondBook]) => secondBook.length - firstBook.length);

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

function getKoreaTodayParts() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());

  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]));
}

function getKoreaTodayDate() {
  const today = getKoreaTodayParts();

  return new Date(today.year, today.month - 1, today.day);
}

function getKoreaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).formatToParts(new Date());
  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, Number(part.value)]),
  );

  return new Date(values.year, values.month - 1, values.day, values.hour, values.minute, values.second);
}

function getKoreaTodayStorageKey() {
  const today = getKoreaTodayParts();

  return `${today.year}-${String(today.month).padStart(2, "0")}-${String(today.day).padStart(2, "0")}`;
}

function isBeforeReleaseTime(reading) {
  const releaseTime = new Date(
    reading.date.getFullYear(),
    reading.date.getMonth(),
    reading.date.getDate(),
    7,
    0,
    0,
  );

  return getKoreaNow() < releaseTime;
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

  const today = getKoreaTodayDate();
  if (today.getFullYear() !== PROGRAM_YEAR) return 0;

  return Math.floor((today - new Date(PROGRAM_YEAR, 0, 1)) / 86400000);
}

function getInitialIndex() {
  const dateParam = new URLSearchParams(window.location.search).get("date");
  if (dateParam) return getDefaultIndex();

  const savedIndex = localStorage.getItem(`${STORAGE_PREFIX}-current-index`);
  const savedOpenDate = localStorage.getItem(`${STORAGE_PREFIX}-last-open-date`);
  const todayKey = getKoreaTodayStorageKey();
  if (savedIndex && savedOpenDate === todayKey) return Number(savedIndex);

  return getDefaultIndex();
}

function getInitialCollapsedMonths(initialIndex) {
  const layoutInitialized = localStorage.getItem(`${STORAGE_PREFIX}-month-layout-initialized`);
  const saved = localStorage.getItem(`${STORAGE_PREFIX}-collapsed-months`);
  if (layoutInitialized && saved) return JSON.parse(saved);

  const activeMonth = readings[initialIndex].date.getMonth() + 1;

  return Object.keys(monthReadings).filter((month) => Number(month) !== activeMonth);
}

const initialIndex = getInitialIndex();
const state = {
  currentIndex: initialIndex,
  playlistId: localStorage.getItem(`${STORAGE_PREFIX}-playlist-id`) || DEFAULT_PLAYLIST_ID,
  completed: new Set(JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}-completed`) || "[]")),
  collapsedMonths: new Set(getInitialCollapsedMonths(initialIndex)),
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
const progressTableToggle = document.querySelector("#progressTableToggle");
const progressDialog = document.querySelector("#progressDialog");
const progressOverview = document.querySelector("#progressOverview");
const progressCalendar = document.querySelector("#progressCalendar");
const completeBeforeToday = document.querySelector("#completeBeforeToday");
const refreshApp = document.querySelector("#refreshApp");
const installApp = document.querySelector("#installApp");
const searchInput = document.querySelector("#searchInput");
const settingsDialog = document.querySelector("#settingsDialog");
const settingsToggle = document.querySelector("#settingsToggle");
const guideDialog = document.querySelector("#guideDialog");
const guideToggle = document.querySelector("#guideToggle");
const decreaseTextSize = document.querySelector("#decreaseTextSize");
const increaseTextSize = document.querySelector("#increaseTextSize");
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
  localStorage.setItem(`${STORAGE_PREFIX}-collapsed-months`, JSON.stringify([...state.collapsedMonths]));
  localStorage.setItem(`${STORAGE_PREFIX}-month-layout-initialized`, "true");
  localStorage.setItem(`${STORAGE_PREFIX}-last-open-date`, getKoreaTodayStorageKey());
}

function getTextScale() {
  return Number(localStorage.getItem(`${STORAGE_PREFIX}-text-scale`) || "0");
}

function setTextScale(nextScale) {
  const scale = Math.max(-1, Math.min(3, nextScale));
  localStorage.setItem(`${STORAGE_PREFIX}-text-scale`, String(scale));
  document.documentElement.style.setProperty("--app-font-size", `${16 + scale * 2}px`);
  decreaseTextSize.disabled = scale <= -1;
  increaseTextSize.disabled = scale >= 3;
}

function isCompleted(reading) {
  return state.completed.has(reading.completionId);
}

function getEmbedUrl() {
  const reading = readings[state.currentIndex];
  if (isBeforeReleaseTime(reading)) return "";

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
  const reading = readings[state.currentIndex];
  if (isBeforeReleaseTime(reading)) return "#";

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

function toggleCompletedById(completionId) {
  if (state.completed.has(completionId)) {
    state.completed.delete(completionId);
  } else {
    state.completed.add(completionId);
  }
  saveState();
  render();
}

function toggleMonth(month) {
  const key = String(month);
  if (state.collapsedMonths.has(key)) {
    state.collapsedMonths.delete(key);
  } else {
    state.collapsedMonths.add(key);
  }
  saveState();
  renderList();
}

function normalizeSearchText(value) {
  const compact = value.replace(/\s+/g, "");
  const alias = BOOK_ALIASES[compact];
  const entry = BOOK_NAME_ENTRIES.find(([book]) => compact.startsWith(book));
  if (entry) return compact.replace(entry[0], entry[1]);

  return alias || compact;
}

function getSearchQuery(value) {
  const compact = value.replace(/\s+/g, "");
  const bookEntry = BOOK_NAME_ENTRIES.find(([book]) => compact.startsWith(book));
  if (!bookEntry) return { compact, normalized: normalizeSearchText(value), bookAlias: "" };

  return {
    compact,
    normalized: compact.replace(bookEntry[0], bookEntry[1]),
    bookAlias: bookEntry[1],
  };
}

function getReadingBook(reading) {
  const rangeWithoutSpaces = reading.range.replace(/\s+/g, "");
  const entry = BOOK_ENTRIES.find(([, alias]) => rangeWithoutSpaces.startsWith(alias));

  return entry ? { fullName: entry[0], alias: entry[1] } : null;
}

function matchesSearch(reading) {
  if (!state.filter) return true;

  const query = getSearchQuery(state.filter);
  const rangeWithoutSpaces = reading.range.replace(/\s+/g, "");
  const baseText = `${reading.day} ${reading.title} ${reading.range} ${rangeWithoutSpaces}`;
  const book = getReadingBook(reading);
  if (baseText.includes(state.filter)) return true;
  if (!query.bookAlias && baseText.includes(query.normalized)) return true;
  if (!book) return false;

  if (query.bookAlias) {
    return book.alias === query.bookAlias && (!query.normalized || rangeWithoutSpaces.includes(query.normalized));
  }

  return book.fullName.includes(state.filter) || book.fullName.includes(query.normalized) || book.alias === query.normalized;
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

function getVisibleReadings() {
  return readings.filter((reading, index) => {
    const previous = readings[index - 1];
    return !previous || previous.completionId !== reading.completionId;
  });
}

function getMonthProgress(month, visibleReadings = getVisibleReadings()) {
  const monthItems = visibleReadings.filter((reading) => reading.date.getMonth() + 1 === month);
  const completedCount = monthItems.filter((reading) => isCompleted(reading)).length;
  const percent = monthItems.length ? Math.round((completedCount / monthItems.length) * 100) : 0;

  return {
    completedCount,
    totalCount: monthItems.length,
    percent,
  };
}

let deferredInstallPrompt = null;

function isStandaloneDisplay() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function getInstallHelpMessage() {
  if (window.location.protocol === "file:") {
    return "설치 버튼은 배포된 https 주소에서 Android Chrome으로 열었을 때 작동해요.";
  }

  return "Android Chrome 메뉴에서 '홈 화면에 추가' 또는 '앱 설치'를 선택해 주세요. 설치창이 준비되면 이 버튼으로 바로 띄울 수 있어요.";
}

function updateInstallButton() {
  if (!installApp) return;

  if (isStandaloneDisplay()) {
    installApp.hidden = true;
    return;
  }

  installApp.hidden = false;
  installApp.textContent = "홈 화면 추가 (안드로이드)";
}

function renderList() {
  const visibleReadings = getVisibleReadings();
  const filtered = visibleReadings.filter((reading) => matchesSearch(reading));

  playlistList.innerHTML = "";

  const readingsByMonth = new Map();
  filtered.forEach((reading) => {
    const month = reading.date.getMonth() + 1;
    if (!readingsByMonth.has(month)) readingsByMonth.set(month, []);
    readingsByMonth.get(month).push(reading);
  });

  readingsByMonth.forEach((monthReadingsForList, month) => {
    const section = document.createElement("section");
    const monthAllReadings = visibleReadings.filter((reading) => reading.date.getMonth() + 1 === month);
    const monthCompleted = monthAllReadings.filter((reading) => isCompleted(reading)).length;
    const collapsed = !state.filter && state.collapsedMonths.has(String(month));
    section.className = "month-section";

    const monthButton = document.createElement("button");
    monthButton.type = "button";
    monthButton.className = "month-toggle";
    monthButton.setAttribute("aria-expanded", String(!collapsed));
    monthButton.innerHTML = `
      <span>${month}월</span>
      <small>${monthCompleted}/${monthAllReadings.length}</small>
      <span class="month-indicator" aria-hidden="true">${collapsed ? "+" : "-"}</span>
    `;
    monthButton.addEventListener("click", () => toggleMonth(month));
    section.appendChild(monthButton);

    const monthList = document.createElement("div");
    monthList.className = "month-list";
    monthList.hidden = collapsed;

    monthReadingsForList.forEach((reading) => {
      monthList.appendChild(createDayItem(reading));
    });

    section.appendChild(monthList);
    playlistList.appendChild(section);
  });

  if (!state.filter) {
    const activeItem = playlistList.querySelector('[aria-current="true"]');
    if (activeItem) {
      playlistList.scrollTop = activeItem.offsetTop - playlistList.clientHeight / 2 + activeItem.clientHeight / 2;
    }
  }
}

function renderProgressDialog() {
  const visibleReadings = getVisibleReadings();
  progressOverview.innerHTML = "";
  progressCalendar.innerHTML = "";

  Object.keys(monthReadings).forEach((monthKey) => {
    const month = Number(monthKey);
    const monthProgress = getMonthProgress(month, visibleReadings);
    const summary = document.createElement("article");
    summary.className = "month-summary";
    summary.innerHTML = `
      <div>
        <strong>${month}월</strong>
        <span>${monthProgress.completedCount}/${monthProgress.totalCount}개 완료</span>
      </div>
      <b>${monthProgress.percent}%</b>
    `;
    progressOverview.appendChild(summary);

    const monthReadingsForGrid = visibleReadings.filter((reading) => reading.date.getMonth() + 1 === month);
    const section = document.createElement("section");
    section.className = "calendar-month";
    section.innerHTML = `
      <h3>${month}월</h3>
      <div class="calendar-grid"></div>
    `;
    const grid = section.querySelector(".calendar-grid");

    monthReadingsForGrid.forEach((reading) => {
      const originalIndex = readings.findIndex((entry) => entry.day === reading.day);
      const group = getGroupForReading(reading);
      const button = document.createElement("button");
      button.type = "button";
      button.className = `calendar-day${isCompleted(reading) ? " done" : ""}${isCurrentReading(reading) ? " current" : ""}${group ? " grouped" : ""}`;
      button.title = `${group ? getGroupLabel(group) : reading.title} · ${reading.range}`;
      button.innerHTML = `
        <span>${reading.date.getDate()}</span>
        <b>${isCompleted(reading) ? "✓" : ""}</b>
      `;
      button.addEventListener("click", () => {
        progressDialog.close();
        setDay(originalIndex);
        scrollToPlayer();
      });
      grid.appendChild(button);
    });

    progressCalendar.appendChild(section);
  });
}

function createDayItem(reading) {
  const item = document.createElement("div");
  const originalIndex = readings.findIndex((entry) => entry.day === reading.day);
  const done = isCompleted(reading);
  const group = getGroupForReading(reading);
  const groupLabel = group ? getGroupLabel(group) : "";

  item.className = `day-item${done ? " done" : ""}${group ? " grouped" : ""}`;
  item.dataset.index = String(originalIndex);
  item.setAttribute("aria-current", String(isCurrentReading(reading)));
  item.innerHTML = `
    <button
      type="button"
      class="check"
      role="checkbox"
      aria-label="${groupLabel || reading.title} 완료"
      aria-checked="${done}"
    >✓</button>
    <button type="button" class="day-open">
      <strong>${groupLabel || reading.title}</strong>
      <span>${reading.range}</span>
    </button>
  `;
  const check = item.querySelector(".check");
  const dayOpen = item.querySelector(".day-open");
  check.addEventListener("click", () => toggleCompletedById(reading.completionId));
  dayOpen.addEventListener("click", () => {
    setDay(originalIndex);
    scrollToPlayer();
  });

  return item;
}

function render() {
  const reading = readings[state.currentIndex];
  const group = getGroupForReading(reading);
  const hasVideo = !isBeforeReleaseTime(reading) && Boolean(getCurrentVideoId());
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
  if (progressDialog.open) renderProgressDialog();
}

function getGroupLabel(group) {
  return `${group.start.replace("-", "월 ")}일-${group.end.split("-")[1]}일`;
}

function getEmptyPlayerText(reading, group) {
  if (!state.playlistId) return "교회 유튜브 재생목록을 연결해 주세요";
  if (isBeforeReleaseTime(reading)) return `${reading.title} 영상은 아직 준비 중이에요`;
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
refreshApp.addEventListener("click", () => {
  window.location.reload();
});
installApp.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    window.alert(getInstallHelpMessage());
    return;
  }

  const promptEvent = deferredInstallPrompt;
  deferredInstallPrompt = null;
  promptEvent.prompt();
  await promptEvent.userChoice.catch(() => null);
  updateInstallButton();
});

searchInput.addEventListener("input", (event) => {
  state.filter = event.target.value.trim();
  renderList();
});

settingsToggle.addEventListener("click", () => {
  settingsDialog.showModal();
});

guideToggle.addEventListener("click", () => {
  guideDialog.showModal();
});

decreaseTextSize.addEventListener("click", () => {
  setTextScale(getTextScale() - 1);
});

increaseTextSize.addEventListener("click", () => {
  setTextScale(getTextScale() + 1);
});

progressTableToggle.addEventListener("click", () => {
  renderProgressDialog();
  progressDialog.showModal();
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

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  updateInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  updateInstallButton();
});

updateInstallButton();
setTextScale(getTextScale());
render();
