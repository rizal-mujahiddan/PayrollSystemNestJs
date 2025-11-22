import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { faker,simpleFaker } from '@faker-js/faker';
import { EmployeeStatus } from 'src/common/enums/employee-status.enum';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async seed() {
    for (let i = 0; i < 10; i++) {
      const employee = this.employeeRepository.create({
        emp_no: simpleFaker.string.uuid(),
        name: faker.person.fullName(),
        rolekey: faker.person.jobTitle(),
        bank_account: faker.finance.accountName(),
        base_salary: faker.number.int({ min: 30000, max: 100000 }),
        join_date: faker.date.past(),
        status: faker.helpers.arrayElement(Object.values(EmployeeStatus)),
        created_at: new Date(),
      });
      await this.employeeRepository.save(employee);
    }
  }
}
