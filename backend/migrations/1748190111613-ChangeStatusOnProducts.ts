import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeStatusOnProducts1748190111613 implements MigrationInterface {
    name = 'ChangeStatusOnProducts1748190111613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."producto_estado_enum" AS ENUM('default', 'descargado', 'facturado')`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "estado" "public"."producto_estado_enum" NOT NULL DEFAULT 'default'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "estado"`);
        await queryRunner.query(`DROP TYPE "public"."producto_estado_enum"`);
    }

}
