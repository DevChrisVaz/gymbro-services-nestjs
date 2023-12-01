import { Injectable } from '@nestjs/common';
import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
import { IPerson } from 'src/users/domain/entities/person.entity';
import { UserResponseDTO } from '../dto/response/user-response.dto';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class FindUserUseCase {
  constructor(private dataServices: DatabaseServicesContract) {}

  async run(uuid: string): Promise<UserResponseDTO> {
    const foundUser: IUser = await this.dataServices.users.findOne({
      person: uuid,
    });

    const foundPerson: IPerson = await this.dataServices.persons.findOne({
      uuid: foundUser.person,
    });

    return new UserResponseDTO({
      ...foundPerson,
      ...foundUser,
    });
  }
}
