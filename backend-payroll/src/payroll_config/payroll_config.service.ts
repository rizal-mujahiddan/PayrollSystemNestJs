import { Injectable } from '@nestjs/common';
import { CreatePayrollConfigDto } from './dto/create-payroll_config.dto';
import { UpdatePayrollConfigDto } from './dto/update-payroll_config.dto';

@Injectable()
export class PayrollConfigService {
  create(createPayrollConfigDto: CreatePayrollConfigDto) {
    return 'This action adds a new payrollConfig';
  }

  findAll() {
    return `This action returns all payrollConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payrollConfig`;
  }

  update(id: number, updatePayrollConfigDto: UpdatePayrollConfigDto) {
    return `This action updates a #${id} payrollConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} payrollConfig`;
  }
}
