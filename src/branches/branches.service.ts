import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './application/dto/create-branch.dto';
import { UpdateBranchDto } from './application/dto/update-branch.dto';
import { plainToInstance } from 'class-transformer';
import {
  Branch,
  IBranch,
  SerializedBranch,
} from './domain/entities/branch.entity';

@Injectable()
export class BranchesService {
  mapDtoToBranch(dto: CreateBranchDto | UpdateBranchDto): IBranch {
    return plainToInstance(Branch, dto);
  }

  serializeBranch(branch: IBranch): SerializedBranch {
    return new SerializedBranch(branch);
  }
}
