import { Umzug, SequelizeStorage } from "umzug";
import { pathToFileURL } from "node:url";
import { sequelize} from "./database.js";

const migrator = new Umzug({
    migrations: {
        glob: "migrations/*.js",

        resolve: async ({name, path, context}) => {
            const migration = await import(pathToFileURL(path).href);

            return {
                name,
                up: async () => migration.up({context}),
                down: async () => migration.down({context}),
            };
        }
    },
    context: sequelize.getQueryInterface(),

    storage: new SequelizeStorage({
        sequelize
    }),
    logger: console
});

export default migrator;