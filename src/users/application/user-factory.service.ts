import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/domain/dto/create-user.dto";
import { User } from "src/users/domain/entities/User";
import { UpdateUserDto } from "../domain/dto/update-user.dto";

@Injectable()
export class UserFactoryService {

    createNewUser(createUserDto: CreateUserDto) {
        const newUser = new User();
    
        newUser.firstName = createUserDto.firstName;
        newUser.lastName = createUserDto.lastName;
        // newUser.

        return newUser;
    }

    updateUser(updateUserDto: UpdateUserDto) {
        const user = new User();

        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;

        return user;
    }
}