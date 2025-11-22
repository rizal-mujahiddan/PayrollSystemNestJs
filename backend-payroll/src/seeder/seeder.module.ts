import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Employee } from '../employee/entities/employee.entity';
import AppDataSource from '../../datasource';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), TypeOrmModule.forFeature([Employee])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}