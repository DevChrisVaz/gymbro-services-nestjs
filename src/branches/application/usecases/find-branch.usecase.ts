import { Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { BranchNotFoundException } from '../exceptions/branch-not-found.exception';

@Injectable()
export class FindBranchUseCase {
  constructor(
    private readonly branchesService: BranchesService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string): Promise<IBranch> {
    const foundBranch: IBranch = await this.dataServices.branches.findOne({
      uuid,
    });
    if (foundBranch) {
      return this.branchesService.serializeBranch(foundBranch);
    }

    throw new BranchNotFoundException();
  }
}