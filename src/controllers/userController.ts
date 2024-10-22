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

const createUser = (
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

const updateUser = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  userId: string,
) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk;
  });

  request.on('end', () => {
    if (!validateUuid(userId)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Invalid userId format' }));
    }

    const userIndex = users.findIndex((item) => {
      return item.id === userId;
    });

    if (userIndex === -1) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'User not found' }));
    }

    if (body) {
      const { username, age, hobbies } = JSON.parse(body);
      users[userIndex] = {
        id: users[userIndex].id,
        username: username ? username : users[userIndex].username,
        age: age ? age : users[userIndex].age,
        hobbies: hobbies ? hobbies : users[userIndex].hobbies,
      };

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(users[userIndex]));
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      return response.end(
        JSON.stringify({
          message: `Please enter the body`,
        }),
      );
    }
  });
};

const deleteUser = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
  userId: string,
) => {
  if (!validateUuid(userId)) {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'Invalid userId format' }));
  }

  const userIndex = users.findIndex((item) => {
    return item.id === userId;
  });

  if (userIndex === -1) {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    return response.end(JSON.stringify({ message: 'User not found' }));
  }

  users.splice(userIndex, 1);
  return response.writeHead(204).end();
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser };
