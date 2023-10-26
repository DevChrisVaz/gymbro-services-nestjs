import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { UpdateBranchDto } from '../dto/update-branch.dto';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { BranchesService } from 'src/branches/branches.service';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    private readonly branchesService: BranchesService,
    private dataServices: DatabaseServicesContract,
  ) {}

  async run(uuid: string, dto: UpdateBranchDto): Promise<IBranch> {
    const dataToUpdate = this.branchesService.mapDtoToBranch(dto);
    const updatedBranch: IBranch = await this.dataServices.branches.update(
      uuid,
      dataToUpdate,
    );
    return this.branchesService.serializeBranch(updatedBranch);
  }
}
