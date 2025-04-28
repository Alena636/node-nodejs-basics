import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const calcHash = async () => {
  const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

  try {
    const fileStream = fs.createReadStream(filePath);

    const hash = crypto.createHash("sha256");
    fileStream.pipe(hash);
    hash.setEncoding("hex");

    hash.on("finish", () => {
      console.log(hash.read());
    });

    fileStream.on("error", (err) => {
      throw new Error("FS operation failed");
    });
  } catch (error) {
    console.error("FS operation failed");
  }
};

calcHash();
