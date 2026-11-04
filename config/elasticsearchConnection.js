import logger from "./logger.js";
import { elasticClient } from "./elasticsearch.js";

export const connectionElasticSearch = async () => {
    try {
        const response = await elasticClient.info();

        logger.info("Elasticsearch connected successfully", {
            clusterName: response.cluster_name,
            version: response.version.number
        });
    }catch(error) {
        logger.error("Elasticsearch connection failed", {
            message: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
};