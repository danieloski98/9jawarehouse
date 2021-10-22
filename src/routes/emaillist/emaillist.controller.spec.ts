import { Test, TestingModule } from '@nestjs/testing';
import { EmaillistController } from './emaillist.controller';

describe('EmaillistController', () => {
  let controller: EmaillistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmaillistController],
    }).compile();

    controller = module.get<EmaillistController>(EmaillistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
