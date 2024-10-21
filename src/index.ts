import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

console.log(`Server is running on port ${port}`);
