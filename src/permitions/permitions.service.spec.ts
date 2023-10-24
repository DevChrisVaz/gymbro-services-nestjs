import { Test, TestingModule } from '@nestjs/testing';
import { PermitionsService } from './permitions.service';

describe('PermitionsService', () => {
  let service: PermitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermitionsService],
    }).compile();

    service = module.get<PermitionsService>(PermitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
