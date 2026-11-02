import dotenv from 'dotenv';
import app from './app.js';
import {connectRedis} from './config/redis.js';
import {connectionDB} from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectionDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1); // Exit the process with an error code
  }
}
  startServer();
