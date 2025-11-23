import { ApprovalActionType } from "src/common/enums/approval-action-type.enum";
import { ApprovalEntityType } from "src/common/enums/approval-entity-type.enum";
import { Employee } from "src/employee/entities/employee.entity";
import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,JoinColumn,CreateDateColumn} from "typeorm"

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'varchar',
    enum:ApprovalEntityType
  })
  entity_type:ApprovalEntityType;

  @Column()
  entity_id: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'approver_id' })
  approver: Employee;

  @Column({
    type:'varchar',
    enum:ApprovalActionType
  })
  action:ApprovalActionType;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
