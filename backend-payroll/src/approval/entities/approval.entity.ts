import { ApprovalActionType } from "src/common/enums/approval-action-type.enum";
import { ApprovalEntityType } from "src/common/enums/approval-entity-type.enum";
import {Entity,PrimaryGeneratedColumn,Column} from "typeorm"

export class Approval {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type:'enum',
        enum:ApprovalEntityType
    })
    entity_type:ApprovalEntityType;
    
    @Column("uuid")
    entity_id:string;

    @Column("uuid")
    approver_id:string;
    
    @Column()
    role:string;

    @Column({
        type:'enum',
        enum:ApprovalActionType
    })
    action:ApprovalActionType;
    
    @Column('text')
    comment:string;
    
    @Column("timestamp")
    created_at:Date;

}