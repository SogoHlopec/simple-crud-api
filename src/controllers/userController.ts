import { IncomingMessage, ServerResponse } from 'node:http';
import { users } from '../models/userModel';


const getAllUsers = (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users))
}

export { getAllUsers }