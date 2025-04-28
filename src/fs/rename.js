import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rename = async () => {
  const folderPath = path.join(__dirname, 'files');
  const wrongFilename = path.join(folderPath, 'wrongFilename.txt');
  const properFilename = path.join(folderPath, 'properFilename.md');

  try {
    await fs.access(wrongFilename);

    try {
      await fs.access(properFilename);
      throw new Error('FS operation failed');
    } catch {
      await fs.rename(wrongFilename, properFilename);
    }
  } catch {
    throw new Error('FS operation failed');
  }
};

rename().catch((err) => console.error(err.message));
