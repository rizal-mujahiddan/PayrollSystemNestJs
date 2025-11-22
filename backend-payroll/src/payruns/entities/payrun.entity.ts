import { PayrunStatus } from 'src/common/enums/payrun-status.enum';
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
  } from 'typeorm';

@Entity()
export class Payrun {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    period_start:Date;

    @Column()
    period_end:Date;

    @Column(
        {
            type:'varchar',
            default:PayrunStatus.DRAFT
        }
    )
    status:PayrunStatus;
    
    @Column("uuid")
    created_by:string;

    @Column({
      default:0,
      type:'decimal'
    })
    total_gross:number;

    @Column({
      default:0,
      type:'decimal'
    })
    total_net:number;

    @Column({ type: 'datetime' })
    created_at:Date;

    @Column({ type: 'datetime' , nullable:true})
    finalized_at?:Date;
}