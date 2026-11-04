import { elasticClient } from './config/elasticsearch.js';

const testElasticsearch = async () => {
    try {
        const response = await elasticClient.index({
            index: "application-logs",     //tells where the document should be stored
            document: {                //contains actual data
                level: "info",
                message: "My first Elasticsearch document",
                service: "simple-login-js",
                timestamp: new Date().toISOString()
            }
        });

        console.log("Document indexed:", response._id);


        const document = await elasticClient.get({
            index: "application-logs",
            id: response._id
        });

        console.log("Retrieved document:", document._source);

        console.log("Document indexed successfully:", response);
        console.log("Document ID:", response._id);
    }catch(error) {
        console.error("Elasticsearch indexing failed:", error);
    }

    const searchResponse = await elasticClient.search({
        index: "application-logs",
        query: {
            match: {
                level: "info"
            }
        }
    });

    console.log("Search results:", searchResponse.hits.hits.map(hit => hit._source));

    const mapping = await elasticClient.indices.getMapping({
        index: "application-logs"
    });

    console.log("Index mapping:", 
        JSON.stringify(mapping, null, 2)
    );

    await elasticClient.index({
        index: "application-logs",
        document: {
            level: "error",
            message: "MYSQL connection failed",
            service: "simple-login-js",
            timestamp: new Date().toISOString()
        }
    });

    console.log("Error log indexed successfully");


    const errorLogs = await elasticClient.search({
        index: "application-logs",
        query: {
            term: {
                "level.keyword": "error"
            }
        }
    });

    console.log("Error logs:", errorLogs.hits.hits.map(hit => hit._source));
};

testElasticsearch();