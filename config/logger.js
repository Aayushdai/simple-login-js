import winston from "winston";
import ElasticsearchTransport from './elasticsearchTransport.js';

const logger = winston.createLogger({
    level: "http",

    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true}),
        winston.format.json()
    ),

    transports: [
        new winston.transports.Console(),

            new winston.transports.File({
                filename: "logs/error.log",
                level: "error",
            }),
           
            new winston.transports.File({
            filename: "logs/combined.log",
        }),

        new ElasticsearchTransport({
            level: "http",
            index: "application-logs"
        })
    ]
});
export default logger;