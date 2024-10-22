import { IncomingMessage, ServerResponse } from 'node:http';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController';

const BASE_URL = '/api/users';

const userRoutes = (
  request: IncomingMessage,
  response: ServerResponse<IncomingMessage>,
) => {
  const url = request.url;
  const method = request.method;
  let userId = '';

  if (url) {
    if (!url.startsWith(BASE_URL)) {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      return response.end(JSON.stringify({ message: 'Not found endpoint' }));
    }
    userId = url.split('/')[3];
  }

  switch (method) {
    case 'GET':
      if (!userId) {
        return getAllUsers(request, response);
      } else if (userId) {
        return getUserById(request, response, userId);
      }
      break;
    case 'POST':
      return createUser(request, response);
    case 'PUT':
        if (userId) {
            return updateUser(request, response, userId);
        }
    case 'DELETE':
        if (userId) {
            return deleteUser(request, response, userId);
        }
    default:
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: 'Not found method' }));
      break;
  }
};

export { userRoutes };
