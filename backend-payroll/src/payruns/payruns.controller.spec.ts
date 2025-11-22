import { Test, TestingModule } from '@nestjs/testing';
import { PayrunsController } from './payruns.controller';
import { PayrunsService } from './payruns.service';

describe('PayrunsController', () => {
  let controller: PayrunsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrunsController],
      providers: [PayrunsService],
    }).compile();

    controller = module.get<PayrunsController>(PayrunsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
