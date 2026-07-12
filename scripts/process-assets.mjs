import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const sourceDir = path.join(root, 'tools', 'source-assets');
const outputDir = path.join(root, 'public', 'assets', 'processed');
const supported = /\.(png|jpe?g)$/i;

const files = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && supported.test(entry.name))
  .map((entry) => entry.name)
  .sort();

if (files.length === 0) {
  throw new Error(`No PNG/JPG files found in ${sourceDir}`);
}

await mkdir(outputDir, { recursive: true });

for (const file of files) {
  const source = path.join(sourceDir, file);
  const base = path.parse(file).name.toLowerCase();

  await sharp(source)
    .rotate()
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(path.join(outputDir, `${base}.webp`));

  await sharp(source)
    .rotate()
    .resize({ width: 360, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(path.join(outputDir, `${base}-thumb.webp`));

  if (/^img_48(20|21|22|23|24|25|26|27|28|38)$/.test(base)) {
    await sharp(source)
      .rotate()
      .extract({ left: 0, top: 310, width: 1206, height: 1206 })
      .resize({ width: 900 })
      .webp({ quality: 84, effort: 5 })
      .toFile(path.join(outputDir, `${base}-media.webp`));
  }
}

const workshopSourceDir = path.join(sourceDir, 'workshop');
const workshopOutputDir = path.join(outputDir, 'workshop');
let workshopFiles = [];

try {
  workshopFiles = (await readdir(workshopSourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && supported.test(entry.name))
    .map((entry) => entry.name)
    .sort();
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

if (workshopFiles.length > 0) {
  await mkdir(workshopOutputDir, { recursive: true });

  for (const file of workshopFiles) {
    const source = path.join(workshopSourceDir, file);
    const base = path.parse(file).name.replace(/\.webp$/i, '').toLowerCase();

    await sharp(source)
      .rotate()
      .resize({ width: 900, height: 900, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(workshopOutputDir, `${base}.webp`));

    await sharp(source)
      .rotate()
      .resize({ width: 420, height: 420, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(workshopOutputDir, `${base}-thumb.webp`));
  }
}

console.log(`Processed ${files.length} screenshots and ${workshopFiles.length} workshop images into ${outputDir}`);
