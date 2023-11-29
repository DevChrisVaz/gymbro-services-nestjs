import { Injectable } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { BranchWithAddressResponseDto } from '../dto/responses/branch-with-address-response.dto';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { AddressResponseDto } from 'src/addresses/application/dto/responses/address-response.dto';

@Injectable()
export class FindBranchesUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(): Promise<BranchWithAddressResponseDto[]> {
    const foundBranches: IBranch[] = await this.dataServices.branches.find({});
    return await Promise.all(
      foundBranches.map(async (branch) => {
        const address: IAddress = await this.dataServices.addresses.findOne({
          uuid: branch.address,
        });
        return new BranchWithAddressResponseDto({
          ...branch,
          address: new AddressResponseDto({ ...address }),
        });
      }),
    );
  }
}
