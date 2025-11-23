import { ApprovalActionType } from "src/common/enums/approval-action-type.enum";
import { ApprovalEntityType } from "src/common/enums/approval-entity-type.enum";
import { Employee } from "src/employee/entities/employee.entity";
import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn} from "typeorm"

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  entity_type: 'payrun' | 'payslip';

  @Column()
  entity_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approver_id' })
  approver: Employee;

  @Column()
  action: 'approve' | 'reject';

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
