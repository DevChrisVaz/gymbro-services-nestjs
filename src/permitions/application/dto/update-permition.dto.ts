import { PartialType } from '@nestjs/swagger';
import { CreatePermitionDto } from './create-permition.dto';

export class UpdatePermitionDto extends PartialType(CreatePermitionDto) {}
