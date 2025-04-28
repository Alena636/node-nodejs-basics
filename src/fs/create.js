import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const create = async () => {
  const folderPath = path.join(__dirname, "files");
  const fileName = "fresh.txt";
  const filePath = path.join(folderPath, fileName);
  const text = "I am fresh and young";

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed");
  } catch {
    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(filePath, text);
  }
};

create().catch((err) => console.error(err));
