import { readFile, writeFile } from "node:fs/promises";

const PLAYLIST_ID = "PLhp7wkPuMcoQHX7KhDqK2fK4MtXpkfTiQ";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
const PLAYLIST_URL = `https://www.youtube.com/playlist?list=${PLAYLIST_ID}&hl=ko`;
const OUTPUT_FILE = new URL("../videos.js", import.meta.url);
const REQUEST_HEADERS = {
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
};

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&apos;", "'");
}

function parseExistingMap(source) {
  const match = source.match(/window\.VIDEO_BY_DATE\s*=\s*(\{[\s\S]*?\});?\s*$/);
  if (!match) {
    throw new Error("videos.js에서 window.VIDEO_BY_DATE 객체를 찾지 못했습니다.");
  }

  return JSON.parse(match[1]);
}

function parseFeedEntries(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((entryMatch) => {
    const entry = entryMatch[1];
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];

    return {
      videoId,
      title: title ? decodeXml(title.trim()) : "",
    };
  });

  return entries.filter((entry) => entry.videoId && entry.title);
}

function extractInitialData(html) {
  const marker = "ytInitialData";
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return null;

  const start = html.indexOf("{", markerIndex);
  if (start < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < html.length; index += 1) {
    const char = html[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
    } else if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return JSON.parse(html.slice(start, index + 1));
      }
    }
  }

  return null;
}

function textFromRuns(value) {
  if (!value) return "";
  if (typeof value.simpleText === "string") return value.simpleText;
  if (Array.isArray(value.runs)) {
    return value.runs.map((run) => run.text || "").join("");
  }

  return "";
}

function collectPlaylistEntries(node, entries = [], seen = new Set()) {
  if (!node || typeof node !== "object") return entries;

  for (const key of ["playlistVideoRenderer", "videoRenderer"]) {
    const renderer = node[key];
    if (!renderer?.videoId || seen.has(renderer.videoId)) continue;

    const title = textFromRuns(renderer.title);
    if (title.includes("[단.단.단 성경통독]")) {
      seen.add(renderer.videoId);
      entries.push({
        videoId: renderer.videoId,
        title,
      });
    }
  }

  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      value.forEach((item) => collectPlaylistEntries(item, entries, seen));
    } else if (value && typeof value === "object") {
      collectPlaylistEntries(value, entries, seen);
    }
  }

  return entries;
}

async function fetchFeedEntries() {
  const response = await fetch(FEED_URL, {
    headers: REQUEST_HEADERS,
  });

  if (!response.ok) {
    console.log(`YouTube RSS unavailable: ${response.status} ${response.statusText}`);
    return [];
  }

  return parseFeedEntries(await response.text());
}

async function fetchPlaylistEntries() {
  const response = await fetch(PLAYLIST_URL, {
    headers: REQUEST_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`YouTube playlist 요청 실패: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const initialData = extractInitialData(html);
  if (!initialData) {
    throw new Error("YouTube 재생목록 페이지에서 ytInitialData를 찾지 못했습니다.");
  }

  return collectPlaylistEntries(initialData);
}

function dateKeyFromTitle(title) {
  const match = title.match(/(\d{1,2})월\s*(\d{1,2})일/);
  if (!match) return "";

  const month = Number(match[1]);
  const day = Number(match[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return "";

  return `${month}-${day}`;
}

function sortVideoMap(videoMap) {
  return Object.fromEntries(
    Object.entries(videoMap).sort(([a], [b]) => {
      const [aMonth, aDay] = a.split("-").map(Number);
      const [bMonth, bDay] = b.split("-").map(Number);

      return aMonth - bMonth || aDay - bDay;
    }),
  );
}

const existingSource = await readFile(OUTPUT_FILE, "utf8");
const videoMap = parseExistingMap(existingSource);
let entries = await fetchFeedEntries();

if (entries.length === 0) {
  entries = await fetchPlaylistEntries();
}

let added = 0;
let changed = 0;

for (const entry of entries) {
  const key = dateKeyFromTitle(entry.title);
  if (!key) continue;

  if (!videoMap[key]) {
    added += 1;
  } else if (videoMap[key] !== entry.videoId) {
    changed += 1;
  }

  videoMap[key] = entry.videoId;
}

const sorted = sortVideoMap(videoMap);
const nextSource = `window.VIDEO_BY_DATE = ${JSON.stringify(sorted, null, 2)};\n`;

if (nextSource !== existingSource) {
  await writeFile(OUTPUT_FILE, nextSource, "utf8");
}

console.log(`Fetched entries: ${entries.length}`);
console.log(`Mapped videos: ${Object.keys(sorted).length}`);
console.log(`Added: ${added}`);
console.log(`Changed: ${changed}`);
