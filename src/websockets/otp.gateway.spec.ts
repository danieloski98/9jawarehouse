import { Test, TestingModule } from '@nestjs/testing';
import { OtpGateway } from './otp.gateway';

describe('OtpGateway', () => {
  let gateway: OtpGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpGateway],
    }).compile();

    gateway = module.get<OtpGateway>(OtpGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
