import { Module } from "@nestjs/common";
import { MongoDBModule } from "./mongodb/mongodb.module";

@Module({
    imports: [MongoDBModule],
    exports: [MongoDBModule]
})
export class DataModule {}