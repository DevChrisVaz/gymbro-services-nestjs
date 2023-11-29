import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateRoleDto } from '../dto/create-role.dto';
import { IRole } from 'src/permitions/domain/entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(private readonly databaseServices: DatabaseServicesContract) {}

  async run(createRoleDto: CreateRoleDto): Promise<IRole> {
    return await this.databaseServices.roles.save(createRoleDto);
  }
}
