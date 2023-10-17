import { Module } from '@nestjs/common';
import { MongoDBModule } from './frameworks/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
  exports: [MongoDBModule],
})
export class DatabaseModule {}
