import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";

const require = createRequire(import.meta.url);

function resolveFfmpeg() {
  try {
    const fromPkg = require("ffmpeg-static");
    if (fromPkg && existsSync(fromPkg)) return fromPkg;
  } catch {
    /* use fallback */
  }
  const fallbacks = [
    path.join("c:\\Users\\Usuario\\Desktop\\alicerce-construtora\\node_modules\\ffmpeg-static\\ffmpeg.exe"),
    path.join("c:\\Users\\Usuario\\Desktop\\demo-construtora\\node_modules\\ffmpeg-static\\ffmpeg.exe"),
    path.join("c:\\Users\\Usuario\\Desktop\\engeluz\\node_modules\\ffmpeg-static\\ffmpeg.exe"),
  ];
  const found = fallbacks.find((file) => existsSync(file));
  if (found) return found;
  throw new Error("ffmpeg-static not found");
}

const root = process.cwd();
const input = path.join(root, "public", "video", "rafael-couto.mp4");
const framesDir = path.join(root, "public", "frames");

function run(ffmpegPath, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpegPath, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with ${code}`));
    });
  });
}

async function main() {
  const ffmpeg = resolveFfmpeg();
  await fs.mkdir(framesDir, { recursive: true });
  const existing = await fs.readdir(framesDir);
  await Promise.all(
    existing
      .filter((file) => /\.(webp|jpg|jpeg)$/i.test(file) || file === "manifest.json")
      .map((file) => fs.unlink(path.join(framesDir, file))),
  );

  console.log("Re-encoding video with dense keyframes for scrubbing...");
  const tempVideo = path.join(root, "public", "video", "rafael-couto.scrub.mp4");
  await run(ffmpeg, [
    "-y",
    "-i",
    input,
    "-an",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "fast",
    "-crf",
    "19",
    "-g",
    "4",
    "-keyint_min",
    "4",
    "-bf",
    "0",
    "-sc_threshold",
    "0",
    "-movflags",
    "+faststart",
    "-vf",
    "scale='min(1920,iw)':-2:flags=lanczos",
    tempVideo,
  ]);
  await fs.copyFile(tempVideo, input);
  await fs.unlink(tempVideo);

  console.log("Extracting high-res scroll frames...");
  await run(ffmpeg, [
    "-y",
    "-i",
    input,
    "-vf",
    "fps=18,scale=1600:-2:flags=lanczos",
    "-c:v",
    "libwebp",
    "-quality",
    "82",
    path.join(framesDir, "frame-%03d.webp"),
  ]);

  const files = (await fs.readdir(framesDir))
    .filter((file) => /\.(webp|jpg|jpeg)$/i.test(file))
    .sort()
    .map((file) => `/frames/${file}`);

  await fs.writeFile(
    path.join(framesDir, "manifest.json"),
    JSON.stringify({ fps: 18, count: files.length, files }, null, 2),
  );

  console.log(`Wrote ${files.length} frames.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
