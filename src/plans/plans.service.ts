import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './application/dto/create-plan.dto';
import { UpdatePlanDto } from './application/dto/update-plan.dto';
import { plainToClass } from 'class-transformer';
import { IPlan, Plan, SerializedPlan } from './domain/entities/plan.entity';

@Injectable()
export class PlansService {
  mapDtoToPlan(dto: CreatePlanDto | UpdatePlanDto): IPlan {
    return plainToClass(Plan, dto);
  }

  serializePlan(plan: IPlan): SerializedPlan {
    return new SerializedPlan(plan);
  }
}
