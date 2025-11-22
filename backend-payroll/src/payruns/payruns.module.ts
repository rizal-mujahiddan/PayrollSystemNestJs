import { Module } from '@nestjs/common';
import { PayrunsService } from './payruns.service';
import { PayrunsController } from './payruns.controller';

@Module({
  controllers: [PayrunsController],
  providers: [PayrunsService],
})
export class PayrunsModule {}
