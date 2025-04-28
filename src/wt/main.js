import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const results = [];
  const workers = [];

  const runWorker = (index, value) => {
    return new Promise((resolve) => {
      const workerPath = path.resolve(__dirname, './worker.js');
      const worker = new Worker(workerPath);
      workers.push(worker);

      worker.postMessage(value);

      worker.on('message', (result) => {
        resolve({ status: 'resolved', data: result });
      });

      worker.on('error', (err) => {
        resolve({ status: 'error', data: null });
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          resolve({ status: 'error', data: null });
        }
      });
    });
  };

  for (let i = 0; i < cpuCount; i++) {
    const value = 10 + i;
    results.push(runWorker(i, value));
  }

  const finalResults = await Promise.all(results);
  console.log(finalResults);

  workers.forEach((worker) => worker.terminate());
};

await performCalculations();
