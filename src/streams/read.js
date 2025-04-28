import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const readableStream = fs.createReadStream(filePath, 'utf-8');
    readableStream.pipe(process.stdout);

    readableStream.on('error', (err) => {
      throw new Error('FS operation failed');
    });
  } catch {
    console.error('FS operation failed');
  }
};

read();
