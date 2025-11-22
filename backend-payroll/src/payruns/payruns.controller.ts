import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PayrunsService } from './payruns.service';
import { CreatePayrunDto } from './dto/create-payrun.dto';
import { UpdatePayrunDto } from './dto/update-payrun.dto';

@Controller('payruns')
export class PayrunsController {
  constructor(private readonly payrunsService: PayrunsService) {}

  @Post()
  create(@Body() createPayrunDto: CreatePayrunDto) {
    return this.payrunsService.create(createPayrunDto);
  }

  @Get()
  findAll() {
    return this.payrunsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payrunsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayrunDto: UpdatePayrunDto) {
    return this.payrunsService.update(+id, updatePayrunDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payrunsService.remove(+id);
  }
}
