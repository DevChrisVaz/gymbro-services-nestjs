import { TokenContract } from 'src/auth/domain/entities/token';
import { TokenRepositoryContract } from 'src/auth/domain/repositories/token-repository.contract';
import { MongoDBRepository } from 'src/database/frameworks/mongodb/mongodb.repository';

export class TokenRepository
  extends MongoDBRepository<TokenContract>
  implements TokenRepositoryContract
{
  override delete(token: string): Promise<TokenContract> {
    return this._repository.findOneAndDelete({ token });
  }
}
