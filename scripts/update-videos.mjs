import { readFile, writeFile } from "node:fs/promises";

const PLAYLIST_ID = "PLhp7wkPuMcoQHX7KhDqK2fK4MtXpkfTiQ";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
const OUTPUT_FILE = new URL("../videos.js", import.meta.url);

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

const response = await fetch(FEED_URL, {
  headers: {
    "user-agent": "dandandan-bible-reader/1.0",
  },
});

if (!response.ok) {
  throw new Error(`YouTube RSS 요청 실패: ${response.status} ${response.statusText}`);
}

const xml = await response.text();
const existingSource = await readFile(OUTPUT_FILE, "utf8");
const videoMap = parseExistingMap(existingSource);
const entries = parseFeedEntries(xml);

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

console.log(`RSS entries: ${entries.length}`);
console.log(`Mapped videos: ${Object.keys(sorted).length}`);
console.log(`Added: ${added}`);
console.log(`Changed: ${changed}`);
