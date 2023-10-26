import { Injectable } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class DeleteBranchUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(id: string): Promise<IBranch> {
    const deletedBranch = await this.dataServices.branches.delete(id);
    return deletedBranch;
  }
}
