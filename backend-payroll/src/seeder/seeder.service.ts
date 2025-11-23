import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { faker, simpleFaker } from '@faker-js/faker';
import { EmployeeStatus } from 'src/common/enums/employee-status.enum';
import { Payrun } from '../payruns/entities/payrun.entity';
import { PayrunStatus } from '../common/enums/payrun-status.enum';
import { Payslip } from '../payslip/entities/payslip.entity';
import { PayslipStatus } from '../common/enums/payslip-status.enum';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Approval } from '../approval/entities/approval.entity';
import { ApprovalActionType } from '../common/enums/approval-action-type.enum';
import { ApprovalEntityType } from '../common/enums/approval-entity-type.enum';
import { AuditLog } from '../audit_logs/entities/audit_log.entity';
import { PayrollConfig } from '../payroll_config/entities/payroll_config.entity';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Payrun)
    private readonly payrunRepository: Repository<Payrun>,
    @InjectRepository(Payslip)
    private readonly payslipRepository: Repository<Payslip>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Approval)
    private readonly approvalRepository: Repository<Approval>,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(PayrollConfig)
    private readonly payrollConfigRepository: Repository<PayrollConfig>,
  ) {}

  async seed() {
    this.logger.log('Starting seeding...');

    const employees: Employee[] = [];
    for (let i = 0; i < 10; i++) {
      const employee = this.employeeRepository.create({
        emp_no: simpleFaker.string.uuid(),
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        bank_account: faker.finance.accountName(),
        base_salary: faker.number.int({ min: 30000, max: 100000 }),
        join_date: faker.date.past(),
        status: faker.helpers.arrayElement(Object.values(EmployeeStatus)),
      });
      employees.push(await this.employeeRepository.save(employee));
    }
    this.logger.log('Seeded employees');

    const payruns: Payrun[] = [];
    for (let i = 0; i < 5; i++) {
      const payrun = this.payrunRepository.create({
        period_start: faker.date.past(),
        period_end: faker.date.future(),
        status: faker.helpers.arrayElement(Object.values(PayrunStatus)),
        created_by: faker.person.fullName(),
        total_gross: faker.number.int({ min: 50000, max: 200000 }),
        total_net: faker.number.int({ min: 40000, max: 180000 }),
      });
      payruns.push(await this.payrunRepository.save(payrun));
    }
    this.logger.log('Seeded payruns');

    for (let i = 0; i < 20; i++) {
      const payslip = this.payslipRepository.create({
        gross_salary: faker.number.int({ min: 3000, max: 10000 }),
        net_salary: faker.number.int({ min: 2500, max: 9000 }),
        status: faker.helpers.arrayElement(Object.values(PayslipStatus)),
        allowances: JSON.stringify({ transport: 500 }),
        deductions: JSON.stringify({ tax: 1000 }),
        tax_details: JSON.stringify({ income_tax: 1000 }),
        employee: faker.helpers.arrayElement(employees),
        payrun: faker.helpers.arrayElement(payruns),
      });
      await this.payslipRepository.save(payslip);
    }
    this.logger.log('Seeded payslips');

    for (let i = 0; i < 30; i++) {
      const transaction = this.transactionRepository.create({
        amount: faker.number.int({ min: 100, max: 5000 }),
        bank_ref: simpleFaker.string.uuid(),
        status: faker.helpers.arrayElement(['PENDING', 'PAID', 'FAILED']),
        attempts: faker.number.int({ min: 1, max: 3 }),
        employee: faker.helpers.arrayElement(employees),
      });
      await this.transactionRepository.save(transaction);
    }
    this.logger.log('Seeded transactions');

    for (let i = 0; i < 15; i++) {
      const approval = this.approvalRepository.create({
        action: faker.helpers.arrayElement(Object.values(ApprovalActionType)),
        entity_type: faker.helpers.arrayElement(Object.values(ApprovalEntityType)),
        entity_id: simpleFaker.string.uuid(),
        approver: faker.helpers.arrayElement(employees),
        comment: faker.lorem.sentence(),
      });
      await this.approvalRepository.save(approval);
    }
    this.logger.log('Seeded approvals');

    for (let i = 0; i < 50; i++) {
      const auditLog = this.auditLogRepository.create({
        entity: faker.lorem.word(),
        entity_id: simpleFaker.string.uuid(),
        action: faker.hacker.verb(),
        before: JSON.stringify({ status: 'PENDING' }),
        after: JSON.stringify({ status: 'APPROVED' }),
        user: faker.helpers.arrayElement(employees),
      });
      await this.auditLogRepository.save(auditLog);
    }
    this.logger.log('Seeded audit logs');

    const payrollConfig = this.payrollConfigRepository.create({
      bpjs_kesehatan_rate: faker.number.float({ min: 0.01, max: 0.05, fractionDigits: 2 }),
      bpjs_jht_employee_rate: faker.number.float({ min: 0.01, max: 0.05, fractionDigits: 2 }),
      bpjs_jht_company_rate: faker.number.float({ min: 0.01, max: 0.05, fractionDigits: 2 }),
      pph21_ptkp: faker.number.int({ min: 50000000, max: 60000000 }),
      overtime_rate: faker.number.int({ min: 50000, max: 100000 }),
      rounding_rule: 'nearest_100',
      effective_date: faker.date.future(),
    });
    await this.payrollConfigRepository.save(payrollConfig);
    this.logger.log('Seeded payroll config');

    this.logger.log('Seeding complete!');
  }
}
