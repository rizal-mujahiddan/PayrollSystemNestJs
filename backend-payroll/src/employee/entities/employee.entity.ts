import { EmployeeStatus } from 'src/common/enums/employee-status.enum';
import { Payslip } from 'src/payslip/entities/payslip.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,
    OneToOne
  } from 'typeorm';

  @Entity('employees')
  export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ unique: true })
    emp_no: string;
  
    @Column()
    name: string;
  
    @Column()
    role: string;
  
    @Column()
    bank_account: string;
  
    @Column('numeric')
    base_salary: number;
  
    @Column({ type: 'date' })
    join_date: Date;
  
    @Column(
      {
          type:'varchar',
          default:EmployeeStatus.ACTIVE
      }
    )
    status:EmployeeStatus;

    @OneToMany(() => Payslip, p => p.employee)
    payslips: Payslip[];
  
    @OneToMany(() => Transaction, t => t.employee)
    transactions: Transaction[];

    @Column()
    email: string;
    
    @OneToOne(() => User, user => user.employee)
    user: User;

    @Column({ name: 'department' })
    department: string;

    @Column()
    work_email:string;

    @Column()
    personal_email:string;
  }
  
