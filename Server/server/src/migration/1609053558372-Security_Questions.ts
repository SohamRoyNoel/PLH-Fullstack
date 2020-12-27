import {MigrationInterface, QueryRunner} from "typeorm";

export class SecurityQuestions1609053558372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create table Security_Questions ([SeqQus_ID] [int] IDENTITY(1,1) NOT NULL, [SeqQus_Qus] [nvarchar](max) NOT NULL)');
        await queryRunner.query('alter table Security_Questions ADD CONSTRAINT PK_Security_Questions PRIMARY KEY CLUSTERED ([SeqQus_ID])');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
