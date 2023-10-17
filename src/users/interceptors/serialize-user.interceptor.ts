import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SerializeUserInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Aquí puedes modificar la respuesta según tus necesidades
        if (data && typeof data === 'object') {
          data.modified = true; // Agregar una propiedad modificada
        }
        return data;
      }),
    );
  }
}
