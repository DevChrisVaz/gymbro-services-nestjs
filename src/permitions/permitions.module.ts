import { Module } from '@nestjs/common';
import { PermitionsService } from './permitions.service';

@Module({
  providers: [PermitionsService],
})
export class PermitionsModule {}
