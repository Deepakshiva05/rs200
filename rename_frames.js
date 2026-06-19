/**
 * rename_frames.js
 * -----------------
 * Renames all image files in a folder to frame_00.png, frame_01.png, ...
 *
 * Usage:
 *   node rename_frames.js
 *
 * Config below — change FOLDER and EXT to match your setup.
 */

const fs = require("fs");
const path = require("path");

// ── CONFIG ──────────────────────────────────────────────
const FOLDER = "./frames";   // folder containing your extracted frames
const EXT    = ".jpg";       // extension of your frames (.png / .jpg / .jpeg)
const PAD    = 3;            // zero-padding digits: 3 → frame_000 (needed for 300 frames)
// ────────────────────────────────────────────────────────

function pad(n, digits) {
  return String(n).padStart(digits, "0");
}

function renameFrames() {
  if (!fs.existsSync(FOLDER)) {
    console.error(`❌  Folder not found: ${FOLDER}`);
    process.exit(1);
  }

  // Get all files with the target extension, sorted alphabetically
  const files = fs
    .readdirSync(FOLDER)
    .filter((f) => f.toLowerCase().endsWith(EXT))
    .sort();

  if (files.length === 0) {
    console.warn(`⚠️  No ${EXT} files found in ${FOLDER}`);
    return;
  }

  console.log(`\n📁  Found ${files.length} file(s) in "${FOLDER}"\n`);

  files.forEach((file, index) => {
    const oldPath = path.join(FOLDER, file);
    const newName = `frame_${pad(index, PAD)}${EXT}`;
    const newPath = path.join(FOLDER, newName);

    if (oldPath === newPath) {
      console.log(`  ✓  ${file}  (already correct)`);
      return;
    }

    fs.renameSync(oldPath, newPath);
    console.log(`  ${file}  →  ${newName}`);
  });

  console.log(`\n✅  Done! ${files.length} file(s) renamed.\n`);
}

renameFrames();
