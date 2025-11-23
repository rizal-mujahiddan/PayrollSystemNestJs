import { MigrationInterface, QueryRunner } from "typeorm";

export class RepairEnum1763863670178 implements MigrationInterface {
    name = 'RepairEnum1763863670178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_payruns" ("id" varchar PRIMARY KEY NOT NULL, "period_start" date NOT NULL, "period_end" date NOT NULL, "status" varchar NOT NULL DEFAULT ('DRAFT'), "total_gross" numeric NOT NULL, "total_net" numeric NOT NULL, "created_by" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_payruns"("id", "period_start", "period_end", "status", "total_gross", "total_net", "created_by", "created_at") SELECT "id", "period_start", "period_end", "status", "total_gross", "total_net", "created_by", "created_at" FROM "payruns"`);
        await queryRunner.query(`DROP TABLE "payruns"`);
        await queryRunner.query(`ALTER TABLE "temporary_payruns" RENAME TO "payruns"`);
        await queryRunner.query(`CREATE TABLE "temporary_payslips" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" numeric NOT NULL, "allowances" text, "deductions" text, "tax_details" text, "net_salary" numeric NOT NULL, "status" varchar NOT NULL DEFAULT ('PENDING'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "employee_id" varchar, "payrun_id" varchar, CONSTRAINT "FK_d03c700f7cdca74c2e4ce963393" FOREIGN KEY ("payrun_id") REFERENCES "payruns" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3ca6cde51127cd649278d038ca9" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payslips"("id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id") SELECT "id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id" FROM "payslips"`);
        await queryRunner.query(`DROP TABLE "payslips"`);
        await queryRunner.query(`ALTER TABLE "temporary_payslips" RENAME TO "payslips"`);
        await queryRunner.query(`CREATE TABLE "temporary_employees" ("id" varchar PRIMARY KEY NOT NULL, "emp_no" varchar NOT NULL, "name" varchar NOT NULL, "role" varchar NOT NULL, "bank_account" varchar NOT NULL, "base_salary" numeric NOT NULL, "join_date" date NOT NULL, "status" varchar NOT NULL DEFAULT ('ACTIVE'), CONSTRAINT "UQ_2daea6572d4efff92ddc79ba7f9" UNIQUE ("emp_no"))`);
        await queryRunner.query(`INSERT INTO "temporary_employees"("id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status") SELECT "id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status" FROM "employees"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`ALTER TABLE "temporary_employees" RENAME TO "employees"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" RENAME TO "temporary_employees"`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" varchar PRIMARY KEY NOT NULL, "emp_no" varchar NOT NULL, "name" varchar NOT NULL, "role" varchar NOT NULL, "bank_account" varchar NOT NULL, "base_salary" numeric NOT NULL, "join_date" date NOT NULL, "status" varchar NOT NULL DEFAULT ('active'), CONSTRAINT "UQ_2daea6572d4efff92ddc79ba7f9" UNIQUE ("emp_no"))`);
        await queryRunner.query(`INSERT INTO "employees"("id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status") SELECT "id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status" FROM "temporary_employees"`);
        await queryRunner.query(`DROP TABLE "temporary_employees"`);
        await queryRunner.query(`ALTER TABLE "payslips" RENAME TO "temporary_payslips"`);
        await queryRunner.query(`CREATE TABLE "payslips" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" numeric NOT NULL, "allowances" text, "deductions" text, "tax_details" text, "net_salary" numeric NOT NULL, "status" varchar NOT NULL DEFAULT ('pending'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "employee_id" varchar, "payrun_id" varchar, CONSTRAINT "FK_d03c700f7cdca74c2e4ce963393" FOREIGN KEY ("payrun_id") REFERENCES "payruns" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3ca6cde51127cd649278d038ca9" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "payslips"("id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id") SELECT "id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id" FROM "temporary_payslips"`);
        await queryRunner.query(`DROP TABLE "temporary_payslips"`);
        await queryRunner.query(`ALTER TABLE "payruns" RENAME TO "temporary_payruns"`);
        await queryRunner.query(`CREATE TABLE "payruns" ("id" varchar PRIMARY KEY NOT NULL, "period_start" date NOT NULL, "period_end" date NOT NULL, "status" varchar NOT NULL, "total_gross" numeric NOT NULL, "total_net" numeric NOT NULL, "created_by" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "payruns"("id", "period_start", "period_end", "status", "total_gross", "total_net", "created_by", "created_at") SELECT "id", "period_start", "period_end", "status", "total_gross", "total_net", "created_by", "created_at" FROM "temporary_payruns"`);
        await queryRunner.query(`DROP TABLE "temporary_payruns"`);
    }

}
