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
