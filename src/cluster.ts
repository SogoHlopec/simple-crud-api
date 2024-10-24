import cluster from 'node:cluster';
import * as http from 'node:http';
import * as os from 'node:os';
import { userRoutes } from './routes/userRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const numCPUs = os.cpus().length - 1;
let currentWorker = 0;

if (cluster.isPrimary) {
  console.log(`Main ${process.pid} is running`);

  for (let i = 1; i <= numCPUs; i++) {
    cluster.fork();
  }

  const server = http.createServer((request, response) => {
      if (currentWorker === numCPUs) {
        currentWorker = 1;
      } else {
        currentWorker++;
      }

    const workerPort = PORT + currentWorker;

    const options = {
      hostname: 'localhost',
      port: workerPort,
      path: request.url,
      method: request.method,
      headers: request.headers,
    };

    const workerRequest = http.request(options, (workerResponse) => {
      const statusCode = workerResponse.statusCode;

      if (statusCode) {
        response.writeHead(statusCode, workerResponse.headers);
        workerResponse.pipe(response, { end: true });
      }
    });

    workerRequest.on('error', (error) => {
      console.error(`Problem with request: ${error.message}`);
      response.writeHead(500);
      response.end('Internal Server Error');
    });

    request.pipe(workerRequest, { end: true });
  });

  server.listen(PORT, () => {
    console.log(`Load balancer is listening on port ${PORT}`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else if (cluster.isWorker) {
  const workerServer = http.createServer(userRoutes);
  const clusterWorker = cluster.worker;

  if (clusterWorker) {
    const portWorker = PORT + clusterWorker.id;

    workerServer.listen(portWorker, () => {
      console.log(
        `Worker TEST ${process.pid} is listening on port ${portWorker}`,
      );
    });
  }
}
