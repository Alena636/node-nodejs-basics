import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const write = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

  try {
    const writableStream = fs.createWriteStream(filePath);
    process.stdin.pipe(writableStream);

    writableStream.on('finish', () => {
      console.log('success');
    });

    writableStream.on('error', (err) => {
        console.error('FS operation failed:', error.message);
    });
  } catch (error) {
    console.error('FS operation failed:', error.message);
  }
};

write();
