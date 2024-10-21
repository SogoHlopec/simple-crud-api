import { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../models/userModel';


const getAllUsers = (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users))
}

const createUser = async (
    request: IncomingMessage,
    response: ServerResponse<IncomingMessage>,
) => {
    let body = ''

    request.on('data', (chunk) => {
        body += chunk;
    });

    request.on('end', () => {
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || !age || !Array.isArray(hobbies)) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            return response.end(JSON.stringify({ message: 'Missing required fields' }));
        }
        const newUser = {
            id: uuidv4(),
            username: username,
            age: age,
            hobbies: hobbies
        }
        users.push(newUser);
        response.writeHead(201, { 'Content-Type': 'application/json' });
        return response.end(JSON.stringify(newUser));
    })
}


export { getAllUsers, createUser }