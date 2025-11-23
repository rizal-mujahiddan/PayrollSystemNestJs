import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1763777626353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE employees (
                id TEXT PRIMARY KEY, 
                emp_no TEXT UNIQUE, 
                name TEXT, 
                role TEXT, 
                bank_account TEXT, 
                base_salary NUMERIC, 
                join_date DATE, 
                status TEXT DEFAULT 'active'
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS employees`);
    }

}
