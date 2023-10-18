import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddUuidToBodyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      value.uuid = uuidv4();
      return value;
    }
    return value;
  }
}
