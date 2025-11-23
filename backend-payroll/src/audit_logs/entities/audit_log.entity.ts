import { Employee } from 'src/employee/entities/employee.entity';
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn,CreateDateColumn
  } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'user_id' })
  user: Employee;

  @Column()
  entity: string;

  @Column()
  entity_id: string;

  @Column()
  action: string;

  @Column('simple-json', { nullable: true })
  before: any;

  @Column('simple-json', { nullable: true })
  after: any;

  @CreateDateColumn()
  created_at: Date;
}
