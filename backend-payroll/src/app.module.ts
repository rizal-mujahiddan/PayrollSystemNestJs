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

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    EmployeeModule,
    PayrunsModule,
    PayslipModule,
    ApprovalModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
