import { PartialType } from '@nestjs/mapped-types';
import { CreatePayrunDto } from './create-payrun.dto';

export class UpdatePayrunDto extends PartialType(CreatePayrunDto) {}
