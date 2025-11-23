import { PayslipStatus } from 'src/common/enums/payslip-status.enum';
import { Employee } from 'src/employee/entities/employee.entity';
import { Payrun } from 'src/payruns/entities/payrun.entity';
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn,CreateDateColumn
  } from 'typeorm';

  @Entity('payslips')
  export class Payslip {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Employee, e => e.payslips)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
  
    @ManyToOne(() => Payrun, r => r.payslips)
    @JoinColumn({ name: 'payrun_id' })
    payrun: Payrun;
  
    @Column('numeric')
    gross_salary: number;
  
    @Column('simple-json', { nullable: true })
    allowances: any;
  
    @Column('simple-json', { nullable: true })
    deductions: any;
  
    @Column('simple-json', { nullable: true })
    tax_details: any;
  
    @Column('numeric')
    net_salary: number;
  
    @Column({
      type:'varchar',
      default:PayslipStatus.PENDING
    })
    status:PayslipStatus;

    @CreateDateColumn()
    created_at: Date;
  }
  