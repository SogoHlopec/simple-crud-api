import * as http from 'node:http';
import * as dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  userRoutes(request, response);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
