import { MigrationInterface, QueryRunner } from "typeorm";

export class Changeschemarelation1763862278242 implements MigrationInterface {
    name = 'Changeschemarelation1763862278242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payruns" ("id" varchar PRIMARY KEY NOT NULL, "period_start" date NOT NULL, "period_end" date NOT NULL, "status" varchar NOT NULL, "total_gross" numeric NOT NULL, "total_net" numeric NOT NULL, "created_by" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "payslips" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" numeric NOT NULL, "allowances" text, "deductions" text, "tax_details" text, "net_salary" numeric NOT NULL, "status" varchar NOT NULL DEFAULT ('pending'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "employee_id" varchar, "payrun_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" varchar PRIMARY KEY NOT NULL, "amount" numeric NOT NULL, "bank_ref" varchar, "status" varchar NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "payslip_id" varchar, "payrun_id" varchar, "employee_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "payroll_config" ("id" varchar PRIMARY KEY NOT NULL, "bpjs_kesehatan_rate" numeric NOT NULL, "bpjs_jht_employee_rate" numeric NOT NULL, "bpjs_jht_company_rate" numeric NOT NULL, "pph21_ptkp" numeric NOT NULL, "overtime_rate" numeric NOT NULL, "rounding_rule" varchar NOT NULL DEFAULT ('nearest_100'), "effective_date" date NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" varchar PRIMARY KEY NOT NULL, "entity" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "before" text, "after" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "approvals" ("id" varchar PRIMARY KEY NOT NULL, "entity_type" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "comment" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "approver_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_employees" ("id" varchar PRIMARY KEY NOT NULL, "emp_no" varchar NOT NULL, "name" varchar NOT NULL, "role" varchar NOT NULL, "bank_account" varchar NOT NULL, "base_salary" numeric NOT NULL, "join_date" date NOT NULL, "status" varchar NOT NULL DEFAULT ('active'), CONSTRAINT "UQ_2daea6572d4efff92ddc79ba7f9" UNIQUE ("emp_no"))`);
        await queryRunner.query(`INSERT INTO "temporary_employees"("id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status") SELECT "id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status" FROM "employees"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`ALTER TABLE "temporary_employees" RENAME TO "employees"`);
        await queryRunner.query(`CREATE TABLE "temporary_payslips" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" numeric NOT NULL, "allowances" text, "deductions" text, "tax_details" text, "net_salary" numeric NOT NULL, "status" varchar NOT NULL DEFAULT ('pending'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "employee_id" varchar, "payrun_id" varchar, CONSTRAINT "FK_3ca6cde51127cd649278d038ca9" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d03c700f7cdca74c2e4ce963393" FOREIGN KEY ("payrun_id") REFERENCES "payruns" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_payslips"("id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id") SELECT "id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id" FROM "payslips"`);
        await queryRunner.query(`DROP TABLE "payslips"`);
        await queryRunner.query(`ALTER TABLE "temporary_payslips" RENAME TO "payslips"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" varchar PRIMARY KEY NOT NULL, "amount" numeric NOT NULL, "bank_ref" varchar, "status" varchar NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "payslip_id" varchar, "payrun_id" varchar, "employee_id" varchar, CONSTRAINT "FK_708ec3c97313bcf84bdb798b635" FOREIGN KEY ("payslip_id") REFERENCES "payslips" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_df4412630fd075d6274a62d46ee" FOREIGN KEY ("payrun_id") REFERENCES "payruns" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_eeaf48e230619e81e05a327b5dc" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "amount", "bank_ref", "status", "attempts", "created_at", "payslip_id", "payrun_id", "employee_id") SELECT "id", "amount", "bank_ref", "status", "attempts", "created_at", "payslip_id", "payrun_id", "employee_id" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_audit_logs" ("id" varchar PRIMARY KEY NOT NULL, "entity" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "before" text, "after" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_bd2726fd31b35443f2245b93ba0" FOREIGN KEY ("user_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_audit_logs"("id", "entity", "entity_id", "action", "before", "after", "created_at", "user_id") SELECT "id", "entity", "entity_id", "action", "before", "after", "created_at", "user_id" FROM "audit_logs"`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`ALTER TABLE "temporary_audit_logs" RENAME TO "audit_logs"`);
        await queryRunner.query(`CREATE TABLE "temporary_approvals" ("id" varchar PRIMARY KEY NOT NULL, "entity_type" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "comment" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "approver_id" varchar, CONSTRAINT "FK_46de2c8562b94a5fbf9a202346a" FOREIGN KEY ("approver_id") REFERENCES "employees" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_approvals"("id", "entity_type", "entity_id", "action", "comment", "created_at", "approver_id") SELECT "id", "entity_type", "entity_id", "action", "comment", "created_at", "approver_id" FROM "approvals"`);
        await queryRunner.query(`DROP TABLE "approvals"`);
        await queryRunner.query(`ALTER TABLE "temporary_approvals" RENAME TO "approvals"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "approvals" RENAME TO "temporary_approvals"`);
        await queryRunner.query(`CREATE TABLE "approvals" ("id" varchar PRIMARY KEY NOT NULL, "entity_type" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "comment" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "approver_id" varchar)`);
        await queryRunner.query(`INSERT INTO "approvals"("id", "entity_type", "entity_id", "action", "comment", "created_at", "approver_id") SELECT "id", "entity_type", "entity_id", "action", "comment", "created_at", "approver_id" FROM "temporary_approvals"`);
        await queryRunner.query(`DROP TABLE "temporary_approvals"`);
        await queryRunner.query(`ALTER TABLE "audit_logs" RENAME TO "temporary_audit_logs"`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" varchar PRIMARY KEY NOT NULL, "entity" varchar NOT NULL, "entity_id" varchar NOT NULL, "action" varchar NOT NULL, "before" text, "after" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "audit_logs"("id", "entity", "entity_id", "action", "before", "after", "created_at", "user_id") SELECT "id", "entity", "entity_id", "action", "before", "after", "created_at", "user_id" FROM "temporary_audit_logs"`);
        await queryRunner.query(`DROP TABLE "temporary_audit_logs"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" varchar PRIMARY KEY NOT NULL, "amount" numeric NOT NULL, "bank_ref" varchar, "status" varchar NOT NULL, "attempts" integer NOT NULL DEFAULT (0), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "payslip_id" varchar, "payrun_id" varchar, "employee_id" varchar)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "amount", "bank_ref", "status", "attempts", "created_at", "payslip_id", "payrun_id", "employee_id") SELECT "id", "amount", "bank_ref", "status", "attempts", "created_at", "payslip_id", "payrun_id", "employee_id" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "payslips" RENAME TO "temporary_payslips"`);
        await queryRunner.query(`CREATE TABLE "payslips" ("id" varchar PRIMARY KEY NOT NULL, "gross_salary" numeric NOT NULL, "allowances" text, "deductions" text, "tax_details" text, "net_salary" numeric NOT NULL, "status" varchar NOT NULL DEFAULT ('pending'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), "employee_id" varchar, "payrun_id" varchar)`);
        await queryRunner.query(`INSERT INTO "payslips"("id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id") SELECT "id", "gross_salary", "allowances", "deductions", "tax_details", "net_salary", "status", "created_at", "employee_id", "payrun_id" FROM "temporary_payslips"`);
        await queryRunner.query(`DROP TABLE "temporary_payslips"`);
        await queryRunner.query(`ALTER TABLE "employees" RENAME TO "temporary_employees"`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" text PRIMARY KEY, "emp_no" text, "name" text, "role" text, "bank_account" text, "base_salary" numeric, "join_date" date, "status" text DEFAULT ('active'), CONSTRAINT "UQ_2daea6572d4efff92ddc79ba7f9" UNIQUE ("emp_no"))`);
        await queryRunner.query(`INSERT INTO "employees"("id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status") SELECT "id", "emp_no", "name", "role", "bank_account", "base_salary", "join_date", "status" FROM "temporary_employees"`);
        await queryRunner.query(`DROP TABLE "temporary_employees"`);
        await queryRunner.query(`DROP TABLE "approvals"`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TABLE "payroll_config"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "payslips"`);
        await queryRunner.query(`DROP TABLE "payruns"`);
    }

}
