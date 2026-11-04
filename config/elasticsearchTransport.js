import Transport from 'winston-transport';
import { elasticClient } from './elasticsearch.js';

class ElasticsearchTransport extends Transport {
    constructor(opts = {}) {
        super(opts);

        this.index = opts.index || 'application-logs';
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const{ level, message, timestamp, ...metadata } =info;

        const document = {
            index: this.index,
                level: level,
                message: message,
                timestamp: timestamp || new Date().toISOString(),
                service: 'simple-login-js',
                ...metadata
            };

            elasticClient.index({
                index: this.index,
                document
            })
        .then(() => callback ())
        .catch((error)=> {
            console.error("Elasticsearch transport failed:", error.message);
            callback();
        });
    }
}

export default ElasticsearchTransport;