import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindPlanUseCase } from '../usecases/find-plan.usecase';
import { IPlan } from 'src/plans/domain/entities/plan.entity';

@Injectable()
export class FindPlanInterceptor<T> implements NestInterceptor<T, any> {
    constructor(private readonly findPlanUseCase: FindPlanUseCase) {

    }
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const id: string = request.params.id;
        const plan: IPlan = await this.findPlanUseCase.run(id);
        request.body.uuid = plan.uuid;
        return next.handle().pipe(map(data => data));
    }
}