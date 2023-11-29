import { Injectable } from '@nestjs/common';
import { IBranch } from 'src/branches/domain/entities/branch.entity';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { BranchNotFoundException } from '../exceptions/branch-not-found.exception';
import { BranchWithAddressResponseDto } from '../dto/responses/branch-with-address-response.dto';
import { IAddress } from 'src/addresses/domain/entities/address.entity';

@Injectable()
export class FindBranchUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<BranchWithAddressResponseDto> {
    const foundBranch: IBranch = await this.dataServices.branches.findOne({
      uuid,
    });
    if (foundBranch) {
      const address: IAddress = await this.dataServices.addresses.findOne({
        uuid: foundBranch.address,
      });
      return new BranchWithAddressResponseDto({
        ...foundBranch,
        address,
      });
    }

    throw new BranchNotFoundException();
  }
}
