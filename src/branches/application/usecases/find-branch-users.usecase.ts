import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IBranchPermition } from 'src/permitions/domain/entities/branch-permition.entity';
import { UserResponseDTO } from 'src/users/application/dto/response/user-response.dto';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class FindBranchUsersUseCase {
  constructor(private databaseServices: DatabaseServicesContract) {}

  async run(branchId: string): Promise<UserResponseDTO[]> {
    const permitions: IBranchPermition[] =
      await this.databaseServices.branchPermitions.find({
        branch: branchId,
      });

    return await Promise.all(
      permitions.map(async (permition) => {
        const user: IUser = await this.databaseServices.users.findOne({
          person: permition.user,
        });
        const person: IPerson = await this.databaseServices.persons.findOne({
          uuid: user.person,
        });

        return new UserResponseDTO({
          ...user,
          ...person,
        });
      }),
    );
  }
}
