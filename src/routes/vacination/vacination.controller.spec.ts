import { Test, TestingModule } from '@nestjs/testing';
import { VacinationController } from './vacination.controller';

describe('VacinationController', () => {
  let controller: VacinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacinationController],
    }).compile();

    controller = module.get<VacinationController>(VacinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
