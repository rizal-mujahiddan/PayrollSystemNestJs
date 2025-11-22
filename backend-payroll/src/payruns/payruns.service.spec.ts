import { Test, TestingModule } from '@nestjs/testing';
import { PayrunsService } from './payruns.service';

describe('PayrunsService', () => {
  let service: PayrunsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrunsService],
    }).compile();

    service = module.get<PayrunsService>(PayrunsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
