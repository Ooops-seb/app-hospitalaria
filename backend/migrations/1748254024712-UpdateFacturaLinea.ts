import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFacturaLinea1748254024712 implements MigrationInterface {
    name = 'UpdateFacturaLinea1748254024712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "cantidad" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "iva"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "iva" double precision DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "subtotal" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "descuento" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "descuento" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "subtotal" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "iva"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "iva" integer`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ALTER COLUMN "cantidad" DROP DEFAULT`);
    }

}
