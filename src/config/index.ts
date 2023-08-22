export const DATABASE_CONFIGURATION = {
    mongoConnectionString: process.env.MONGO_DB_URI as string
}

import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./database.config";

export default ConfigModule.forRoot({
    load: [databaseConfig],
    envFilePath: '.development.env',
    isGlobal: true
});