# simple-crud-api

### Description
The simple CRUD API using in-memory database underneath

### Installation and startup
1. Install node v22.9.0
2. Fork or clone this repository
3. install dependency
```bash
npm install
```
4. Set the port in the .env file

### Run
To start the server (development mode):

```bash
npm run start:dev
```

To start the server (production mode):
```bash
npm run start:prod
```

Start the multiple instances with the balancer:
```bash
npm run start:multi
```

Run tests:
```bash
npm run test
```

### Endpoints
 - **GET** `api/users` is used to get all persons
    - Server should answer with `status code` **200** and all users records
- **GET** `api/users/{userId}` 
    - Server should answer with `status code` **200** and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server should answer with `status code` **201** and newly created record
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
    - Server should answer with` status code` **200** and updated record
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Data model
```
[
  {
    id: string,
    username: string,
    age: number,
    hobbies: [] | string[]
  },
  ...
]
```