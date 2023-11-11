import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { UserResponseDTO } from '../dto/response/user-response.dto';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class FindUsersUseCase {
  constructor(private dataServices: DatabaseServicesContract) { }

  async run(): Promise<UserResponseDTO[]> {
    const foundUsers: IUser[] = await this.dataServices.users.find(
      {},
    );
    return await Promise.all(
      foundUsers.map(async (user) => {
        const foundPerson: IPerson = await this.dataServices.persons.findOne({
          uuid: user.person,
        });

        return new UserResponseDTO({
          ...foundPerson,
          ...user,
        });
      }),
    );
  }
}
