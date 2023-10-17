import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FindOneUseCaseContract } from '../contracts/usecase.contract';

@Injectable()
export class FindRegistryInterceptor<T> implements NestInterceptor<T, any> {
  constructor(
    private readonly findRegistryUseCase: FindOneUseCaseContract<T>,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const id: string = request.params.id;
    const registry: T = await this.findRegistryUseCase.run(id);
    request.body.uuid = registry['uuid'];
    return next.handle().pipe(map((data) => data));
  }
}
