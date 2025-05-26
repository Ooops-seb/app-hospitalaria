import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFacturaLineaCantidad1748254286058 implements MigrationInterface {
    name = 'UpdateFacturaLineaCantidad1748254286058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "cantidad" SET DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "cantidad" SET DEFAULT '0'`);
    }

}
