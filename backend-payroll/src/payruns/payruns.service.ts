import { Injectable } from '@nestjs/common';
import { CreatePayrunDto } from './dto/create-payrun.dto';
import { UpdatePayrunDto } from './dto/update-payrun.dto';

@Injectable()
export class PayrunsService {
  create(createPayrunDto: CreatePayrunDto) {
    return 'This action adds a new payrun';
  }

  findAll() {
    return `This action returns all payruns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payrun`;
  }

  update(id: number, updatePayrunDto: UpdatePayrunDto) {
    return `This action updates a #${id} payrun`;
  }

  remove(id: number) {
    return `This action removes a #${id} payrun`;
  }
}
