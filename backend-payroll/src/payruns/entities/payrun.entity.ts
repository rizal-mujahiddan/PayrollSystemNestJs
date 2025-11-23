import { PayrunStatus } from 'src/common/enums/payrun-status.enum';
import { Payslip } from 'src/payslip/entities/payslip.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
    Entity, PrimaryGeneratedColumn, Column, OneToMany,CreateDateColumn
  } from 'typeorm';

  @Entity('payruns')
  export class Payrun {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'date' })
    period_start: Date;
  
    @Column({ type: 'date' })
    period_end: Date;
  
    @Column()
    status: string;
  
    @Column('numeric')
    total_gross: number;
  
    @Column('numeric')
    total_net: number;
  
    @Column()
    created_by: string;
  
    @OneToMany(() => Payslip, p => p.payrun)
    payslips: Payslip[];
  
    @OneToMany(() => Transaction, t => t.payrun)
    transactions: Transaction[];
  
    @CreateDateColumn()
    created_at: Date;
  }
  