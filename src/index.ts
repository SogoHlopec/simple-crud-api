import * as http from 'node:http';
import * as dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  try {
    userRoutes(request, response);
  } catch (error) {
    console.log(error);
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end('Oops, something went wrong on the server.');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { server };
