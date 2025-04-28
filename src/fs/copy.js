import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const copy = async () => {
  const sourceFolder = path.join(__dirname, 'files');
  const destinationFolder = path.join(__dirname, 'files_copy');

  try {
    await fs.access(sourceFolder);

    try {
      await fs.access(destinationFolder);
      throw new Error('FS operation failed');
    } catch {
      await fs.mkdir(destinationFolder, { recursive: true });

      const files = await fs.readdir(sourceFolder);

      for (const file of files) {
        const sourcePath = path.join(sourceFolder, file);
        const destinationPath = path.join(destinationFolder, file);
        await fs.copyFile(sourcePath, destinationPath);
      }

    }
  } catch {
    throw new Error('FS operation failed');
  }
};

copy().catch((err) => console.error(err.message));
