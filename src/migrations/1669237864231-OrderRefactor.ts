import { MigrationInterface, QueryRunner } from "typeorm"

export class OrderRefactor1669237864231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "order" RENAME COLUMN "status" to "state"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "order" RENAME COLUMN "state" to "status"`
        );
    }

}
