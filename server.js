import dotenv from 'dotenv';
import app from './app.js';
import logger from './config/logger.js';
import {connectRedis} from './config/redis.js';
import { connectionElasticSearch } from './config/elasticsearchConnection.js';
import {connectionDB} from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectionDB();
    await connectRedis();
    await connectionElasticSearch();



    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  }catch (error) {
    logger.error('Error starting the server:', error.message);
    process.exit(1); // Exit the process with an error code
  }
}
  startServer();
