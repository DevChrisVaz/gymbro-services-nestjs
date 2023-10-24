import { Injectable } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';

@Injectable()
export class FindBranchesUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(): Promise<IBranch[]> {
    const foundBranches: IBranch[] = await this.dataServices.branches.find(
      {},
    );
    return foundBranches;
  }
}
