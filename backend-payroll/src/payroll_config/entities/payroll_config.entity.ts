import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn} from "typeorm"

@Entity('payroll_config')
export class PayrollConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  bpjs_kesehatan_rate: number;

  @Column('numeric')
  bpjs_jht_employee_rate: number;

  @Column('numeric')
  bpjs_jht_company_rate: number;

  @Column('numeric')
  pph21_ptkp: number;

  @Column('numeric')
  overtime_rate: number;

  @Column({ default: 'nearest_100' })
  rounding_rule: string;

  @Column({ type: 'date' })
  effective_date: Date;
}
