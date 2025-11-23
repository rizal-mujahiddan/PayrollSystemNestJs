import { Employee } from 'src/employee/entities/employee.entity';
import { Payrun } from 'src/payruns/entities/payrun.entity';
import { Payslip } from 'src/payslip/entities/payslip.entity';
import { TransactionStatus } from '../../common/enums/transaction-status.enum';
import {
    Entity,ManyToOne,PrimaryGeneratedColumn,JoinColumn,Column,CreateDateColumn
} from 'typeorm'

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Payslip)
  @JoinColumn({ name: 'payslip_id' })
  payslip: Payslip;

  @ManyToOne(() => Payrun)
  @JoinColumn({ name: 'payrun_id' })
  payrun: Payrun;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column('numeric')
  amount: number;

  @Column({ nullable: true })
  bank_ref: string;

  @Column({
    type: 'varchar',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ default: 0 })
  attempts: number;

  @CreateDateColumn()
  created_at: Date;
}
