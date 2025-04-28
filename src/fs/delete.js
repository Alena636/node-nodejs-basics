import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const remove = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.access(filePath);

    await fs.unlink(filePath);
  } catch {
    throw new Error('FS operation failed');
  }
};

remove().catch((err) => console.error(err.message));
