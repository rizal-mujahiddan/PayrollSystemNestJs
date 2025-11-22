import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial21763787053332 implements MigrationInterface {
    name = 'Initial21763787053332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payslip" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" decimal NOT NULL, "overtime_amount" decimal NOT NULL DEFAULT (0), "net_salary" decimal NOT NULL DEFAULT (0), "status" varchar NOT NULL DEFAULT ('PENDING'), "created_at" datetime NOT NULL, "allowances" text, "deductions" text, "tax_details" text)`);
        await queryRunner.query(`CREATE TABLE "payrun" ("id" varchar PRIMARY KEY NOT NULL, "period_start" datetime NOT NULL, "period_end" datetime NOT NULL, "status" varchar NOT NULL DEFAULT ('DRAFT'), "created_by" varchar NOT NULL, "total_gross" decimal NOT NULL DEFAULT (0), "total_net" decimal NOT NULL DEFAULT (0), "created_at" datetime NOT NULL, "finalized_at" datetime)`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" varchar PRIMARY KEY NOT NULL, "emp_no" varchar NOT NULL, "name" varchar NOT NULL, "rolekey" varchar NOT NULL, "bank_account" varchar NOT NULL, "base_salary" decimal NOT NULL, "join_date" datetime NOT NULL, "status" varchar NOT NULL DEFAULT ('ACTIVE'), "created_at" datetime NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "payrun"`);
        await queryRunner.query(`DROP TABLE "payslip"`);
    }

}
