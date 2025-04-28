import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compress = async () => {
  const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const destinationFilePath = path.join(__dirname, 'files', 'archive.gz');

  try {
    const readableStream = fs.createReadStream(sourceFilePath);
    const writableStream = fs.createWriteStream(destinationFilePath);
    const gzipStream = zlib.createGzip();

    readableStream.pipe(gzipStream).pipe(writableStream);

    writableStream.on('finish', () => {
      console.log('success');
    });

    readableStream.on('error', () => {
      throw new Error('FS operation failed');
    });

    writableStream.on('error', () => {
      throw new Error('FS operation failed');
    });
  } catch (error) {
    console.error('FS operation failed:', error.message);
  }
};

compress();
