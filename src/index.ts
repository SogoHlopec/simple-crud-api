import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
    if (request.url == '/api/users') {
        response.write('test');
    }
    response.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
