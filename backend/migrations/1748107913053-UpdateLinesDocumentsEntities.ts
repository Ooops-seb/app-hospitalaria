import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLinesDocumentsEntities1748107913053 implements MigrationInterface {
    name = 'UpdateLinesDocumentsEntities1748107913053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2"`);
        await queryRunner.query(`CREATE TABLE "documento" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "direccion" character varying NOT NULL, "cliente" character varying NOT NULL, "estado" "public"."documento_estado_enum" NOT NULL DEFAULT 'default', "clave_acceso" character varying, "type" character varying NOT NULL, "pacienteId" integer, "facturaId" integer, CONSTRAINT "REL_799f562e7116756a63015a2879" UNIQUE ("facturaId"), CONSTRAINT "PK_14a00534ba5a1136f420342c965" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca073bb4219eecc55d79092956" ON "documento" ("type") `);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "cantidad"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "precio_unitario"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "total" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "iva" integer`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "subtotal" double precision`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "descuento" double precision`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "nota_venta" character varying`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "descargoId" integer`);
        await queryRunner.query(`ALTER TABLE "servicio" ADD "estado" "public"."servicio_estado_enum" NOT NULL DEFAULT 'default'`);
        await queryRunner.query(`CREATE INDEX "IDX_264495581ee6fd1ee11944b926" ON "linea_transaccion" ("type") `);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2" FOREIGN KEY ("facturaId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_463bdbc5f927b7ca2dc6e763644" FOREIGN KEY ("descargoId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documento" ADD CONSTRAINT "FK_59312c823e40afdf05748f5c16e" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documento" ADD CONSTRAINT "FK_799f562e7116756a63015a28799" FOREIGN KEY ("facturaId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documento" DROP CONSTRAINT "FK_799f562e7116756a63015a28799"`);
        await queryRunner.query(`ALTER TABLE "documento" DROP CONSTRAINT "FK_59312c823e40afdf05748f5c16e"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_463bdbc5f927b7ca2dc6e763644"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_264495581ee6fd1ee11944b926"`);
        await queryRunner.query(`ALTER TABLE "servicio" DROP COLUMN "estado"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "descargoId"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "nota_venta"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "descuento"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "iva"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "precio_unitario" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD "cantidad" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca073bb4219eecc55d79092956"`);
        await queryRunner.query(`DROP TABLE "documento"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2" FOREIGN KEY ("facturaId") REFERENCES "factura"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
