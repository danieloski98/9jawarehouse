import { Test, TestingModule } from '@nestjs/testing';
import { VacinationService } from './vacination.service';

describe('VacinationService', () => {
  let service: VacinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VacinationService],
    }).compile();

    service = module.get<VacinationService>(VacinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
