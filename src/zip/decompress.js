import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  try {
    const readableStream = fs.createReadStream(compressedFilePath);
    const writableStream = fs.createWriteStream(decompressedFilePath);
    const gunzipStream = zlib.createGunzip();
    readableStream.pipe(gunzipStream).pipe(writableStream);

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

decompress();
