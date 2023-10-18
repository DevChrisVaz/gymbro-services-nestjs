import { RepositoryContract } from 'src/database/domain/contracts/repository.contract';
import { TokenContract } from 'src/auth/domain/entities/token';

export abstract class TokenRepositoryContract extends RepositoryContract<TokenContract> {}
