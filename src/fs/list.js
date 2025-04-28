import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const list = async () => {
  const folderPath = path.join(__dirname, 'files');

  try {
    await fs.access(folderPath);

    const filenames = await fs.readdir(folderPath);

    console.log(filenames);
  } catch {
    throw new Error('FS operation failed');
  }
};

list().catch((err) => console.error(err.message));
