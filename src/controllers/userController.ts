import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../models/userModel';
import { validateUuid } from '../utils/validateUuid';

const getAllUsers = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(users));
};

const getUserById = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  userId: string,
) => {
  if (!validateUuid(userId)) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Invalid userId format' }));
  }

  const user = users.find((item) => {
    return item.id === userId;
  });

  if (!user) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'User not found' }));
  }

  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(user));
};

const createUser = async (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);
    if (!username || !age || !Array.isArray(hobbies)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(
        JSON.stringify({ message: 'Missing required fields' }),
      );
    }
    const newUser = {
      id: uuidv4(),
      username: username,
      age: age,
      hobbies: hobbies,
    };
    users.push(newUser);
    response.writeHead(201, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify(newUser));
  });
};

export { getAllUsers, createUser, getUserById };
