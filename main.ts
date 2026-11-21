// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is the YouTube video itself: an AI agent cut a vertical GTA 6
// clip from Rockstar's official Trailer 2, added make.fun's pitch as
// on-screen text, and the clip goes up on YouTube as a public Short.
// VIDEO.json at the repository root holds that video's address.
//
// All this program does is copy VIDEO.json from the repository into the
// output directory, where the gate reads it. Nothing it writes about the
// video is scored; the house reads the video's views from YouTube itself.
//
// Local run (mirrors how the grader invokes it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'VIDEO.json');
const target = join(outputDir, 'VIDEO.json');

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(`Could not copy VIDEO.json from ${botDir}: ${(error as Error).message}`);
  process.exit(1);
}
