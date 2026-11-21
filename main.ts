// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is the YouTube video itself: an AI agent cut a vertical GTA 6
// clip from Rockstar's official Trailer 2, added make.fun's pitch as
// on-screen text, and the clip goes up on YouTube as a public Short.
// VIDEO.json at the repository root holds that video's address.
//
// The submitted video is v2: the GTA 6 chase hook (first ~10 s) stays, and
// the make.fun pitch runs as its own separate segment after it, on a plain
// background instead of over the footage, so the hook keeps the viewer and
// the pitch reads cleanly on its own.
//
// All this program does is copy VIDEO.json from the repository into the
// output directory, where the gate reads it. Nothing it writes about the
// video is scored; the house reads the video's views from YouTube itself.
//
// Local run (mirrors how the grader invokes it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(
    `Could not copy VIDEO.json from ${source} to ${target}: ${(error as Error).message}. ` +
      `Check that VIDEO.json exists in the repository and is readable.`,
  );
  process.exit(1);
}

// The gate only accepts a real YouTube video address, so fail loudly here
// instead of handing it a placeholder or a malformed URL.
const video = JSON.parse(readFileSync(target, 'utf8')) as { url?: unknown };
if (typeof video.url !== 'string' || !/^https:\/\/(www\.|m\.)?(youtube\.com\/(shorts\/|watch\?v=)|youtu\.be\/)/.test(video.url)) {
  console.error(`VIDEO.json does not hold a valid YouTube video URL: ${JSON.stringify(video.url)}`);
  process.exit(1);
}
