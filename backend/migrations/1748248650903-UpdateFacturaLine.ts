import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFacturaLine1748248650903 implements MigrationInterface {
    name = 'UpdateFacturaLine1748248650903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "cantidad" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "cantidad"`);
    }

}
