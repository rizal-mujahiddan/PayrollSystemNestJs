import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrollConfigDto } from './create-payroll_config.dto';

export class UpdatePayrollConfigDto extends PartialType(CreatePayrollConfigDto) {}
