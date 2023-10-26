import { Injectable } from '@nestjs/common';
// import { CreatePermitionDto } from './application/dto/create-permition.dto';
// import { UpdatePermitionDto } from './application/dto/update-permition.dto';

@Injectable()
export class PermitionsService {
  create() {
    return 'This action adds a new permition';
  }

  findAll() {
    return `This action returns all permitions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permition`;
  }

  update(id: number) {
    return `This action updates a #${id} permition`;
  }

  remove(id: number) {
    return `This action removes a #${id} permition`;
  }
}
