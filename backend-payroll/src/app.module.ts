import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { PayrunsModule } from './payruns/payruns.module';
import { PayslipModule } from './payslip/payslip.module';
import { ApprovalModule } from './approval/approval.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from 'datasource';
import { SeederModule } from './seeder/seeder.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PayrollConfigModule } from './payroll_config/payroll_config.module';
import { AuditLogsModule } from './audit_logs/audit_logs.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    EmployeeModule,
    PayrunsModule,
    PayslipModule,
    ApprovalModule,
    SeederModule,
    TransactionsModule,
    PayrollConfigModule,
    AuditLogsModule,
    UserModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
