// import { Injectable } from '@nestjs/common';
// import { GYMUserResponseDTO } from '../dto/response/gym-user-response.dto';
// import { DatabaseServicesContract } from 'src/database/domain/contracts/database-services.contract';
// import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
// import { IUser } from 'src/users/domain/entities/user.entity';

// @Injectable()
// export class FindGYMUsersUseCase {
//   constructor(private readonly databaseServices: DatabaseServicesContract) {}

//   async run(gymId: string): Promise<GYMUserResponseDTO[]> {
//     const foundGYMUsers: IGYMUser[] = await this.databaseServices.GYMUsers.find(
//       { gym: gymId },
//     );
//     return foundGYMUsers.map((gymUser) => {
//       let foundUser: IUser;

//       this.databaseServices.users
//         .findOne({ uuid: gymUser.user })
//         .then((user) => {
//           foundUser = user;
//         });

//       return new GYMUserResponseDTO({
//         ...foundUser,
//         ...gymUser,
//       });
//     });
//   }
// }
