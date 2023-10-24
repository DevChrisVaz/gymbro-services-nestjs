import { Injectable } from "@nestjs/common";
import { BranchesService } from "src/branches/branches.service";
import { IBranch } from "src/branches/domain/entities/branch.entity";
import { DatabaseServicesContract } from "src/database/domain/contracts/database-services.contract";
import { CreateBranchDto } from "../dto/create-branch.dto";

@Injectable()
export class CreateBranchUseCase {
    constructor(
        private readonly branchesService: BranchesService,
        private readonly dataServices: DatabaseServicesContract
    ) { }

    async run(createBranchDto: CreateBranchDto): Promise<IBranch> {
        const branch: IBranch = this.branchesService.mapDtoToBranch(createBranchDto);
        const createdBranch: IBranch = await this.dataServices.branches.save(branch);
        return this.branchesService.serializeBranch(createdBranch);
    }
}