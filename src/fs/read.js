import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    await fs.access(filePath);

    const content = await fs.readFile(filePath, 'utf-8');
    console.log(content);
  } catch {
    throw new Error('FS operation failed');
  }
};

read().catch((err) => console.error(err.message));
