import { EmployeeStatus } from 'src/common/enums/employee-status.enum';
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne
  } from 'typeorm';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    id:number;

    @Column()
    emp_no:string;

    @Column()
    name:string;

    @Column()
    rolekey:string;

    @Column()
    bank_account:string;

    @Column('decimal')
    base_salary:number;

    @Column()
    join_date:Date;

    @Column(
        {
            type:'varchar',
            default:EmployeeStatus.ACTIVE
        }
    )
    status:EmployeeStatus;

    @Column({ type: 'datetime' })
    created_at:Date;
}
