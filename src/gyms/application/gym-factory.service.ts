import { Injectable } from "@nestjs/common";
import { CreateGymDto } from "../domain/dto/create-gym.dto";
import { Gym, IGym } from "../domain/entities/gym.entity";
import { UpdateGymDto } from "../domain/dto/update-gym.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class GymFactoryService {
    createNewGym(createGymDto: CreateGymDto): IGym {
        const newGym = new Gym();

        newGym.uuid = uuid();
        newGym.name = createGymDto.name;
        newGym.description = createGymDto.name;
        newGym.address = createGymDto.address;

        return newGym;
    }

    updateGym(updateGymDto: UpdateGymDto): IGym {
        const gymToUpdate = new Gym();

        gymToUpdate.name = updateGymDto.name;
        gymToUpdate.description = updateGymDto.name;
        gymToUpdate.address = updateGymDto.address;

        return gymToUpdate;
    }
}