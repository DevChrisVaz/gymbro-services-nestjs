import { Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { CreateBranchDto } from '../dto/create-branch.dto';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    private readonly branchesService: BranchesService,
    private readonly addressesService: AddressesService,
    private readonly dataServices: DatabaseServicesContract,
  ) {}

  async run(createBranchDto: CreateBranchDto): Promise<IBranch> {
    const address: IAddress = this.addressesService.mapDtoToAddress(createBranchDto.address);
    let branch: IBranch =
      this.branchesService.mapDtoToBranch(createBranchDto);
    
    const createdAddress: IAddress = await this.dataServices.addresses.save(address);
    branch.address = createdAddress.uuid;

    const createdBranch: IBranch = await this.dataServices.branches.save(
      branch,
    );
    
    return this.branchesService.serializeBranch(createdBranch);
  }
}
