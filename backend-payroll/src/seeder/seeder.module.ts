import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Employee } from '../employee/entities/employee.entity';
import { Payrun } from '../payruns/entities/payrun.entity';
import { Payslip } from '../payslip/entities/payslip.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Approval } from '../approval/entities/approval.entity';
import { AuditLog } from '../audit_logs/entities/audit_log.entity';
import { PayrollConfig } from '../payroll_config/entities/payroll_config.entity';
import AppDataSource from '../../datasource';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([
      Employee,
      Payrun,
      Payslip,
      Transaction,
      Approval,
      AuditLog,
      PayrollConfig,
      User,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
