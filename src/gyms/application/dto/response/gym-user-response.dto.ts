// import { ApiProperty } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';
// import { IGYMUser } from 'src/gyms/domain/entities/gym-user.entity';
// import { IUser } from 'src/users/domain/entities/user.entity';

// export class GYMUserResponseDTO implements IUser, IGYMUser {
//   @Exclude()
//   _id?: string;

//   @Exclude()
//   __v?: string;

//   @Exclude()
//   user: string;

//   @Exclude()
//   usedPasswords: string[];

//   @ApiProperty()
//   userName: string;

//   @ApiProperty()
//   gym: string;

//   @ApiProperty()
//   rol: string;

//   @Exclude()
//   uuid: string;

//   @ApiProperty()
//   firstName: string;

//   @ApiProperty()
//   lastName: string;

//   @ApiProperty()
//   profilePicture: string;

//   @Exclude()
//   status: string;

//   @ApiProperty()
//   createdAt?: string;

//   @ApiProperty()
//   updatedAt?: string;

//   constructor(partial: Partial<GYMUserResponseDTO>) {
//     Object.assign(this, partial);
//   }
// }
