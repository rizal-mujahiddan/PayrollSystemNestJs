import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrollConfigService } from './payroll_config.service';
import { CreatePayrollConfigDto } from './dto/create-payroll_config.dto';
import { UpdatePayrollConfigDto } from './dto/update-payroll_config.dto';

@Controller('payroll-config')
export class PayrollConfigController {
  constructor(private readonly payrollConfigService: PayrollConfigService) {}

  @Post()
  create(@Body() createPayrollConfigDto: CreatePayrollConfigDto) {
    return this.payrollConfigService.create(createPayrollConfigDto);
  }

  @Get()
  findAll() {
    return this.payrollConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrollConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrollConfigDto: UpdatePayrollConfigDto) {
    return this.payrollConfigService.update(+id, updatePayrollConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrollConfigService.remove(+id);
  }
}
