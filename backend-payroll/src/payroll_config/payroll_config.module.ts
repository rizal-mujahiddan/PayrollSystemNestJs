import { Module } from '@nestjs/common';
import { PayrollConfigService } from './payroll_config.service';
import { PayrollConfigController } from './payroll_config.controller';

@Module({
  controllers: [PayrollConfigController],
  providers: [PayrollConfigService],
})
export class PayrollConfigModule {}
