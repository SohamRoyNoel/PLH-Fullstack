import {MigrationInterface, QueryRunner} from "typeorm";

export class SecurityQuestions1608885596341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create table Security_Questions (SeqQus_ID int NOT NULL, SeqQus_Qus nvarchar(max) NOT NULL)')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
