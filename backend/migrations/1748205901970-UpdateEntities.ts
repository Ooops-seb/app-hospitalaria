import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1748205901970 implements MigrationInterface {
    name = 'UpdateEntities1748205901970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."documento_estado_enum" AS ENUM('default', 'descargado', 'facturado')`);
        await queryRunner.query(`CREATE TABLE "documento" ("id" SERIAL NOT NULL, "fecha" date NOT NULL, "direccion" character varying NOT NULL, "cliente" character varying NOT NULL, "estado" "public"."documento_estado_enum" NOT NULL DEFAULT 'default', "clave_acceso" character varying, "total" double precision, "type" character varying NOT NULL, "pacienteId" integer, "facturaId" integer, CONSTRAINT "REL_799f562e7116756a63015a2879" UNIQUE ("facturaId"), CONSTRAINT "PK_14a00534ba5a1136f420342c965" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca073bb4219eecc55d79092956" ON "documento" ("type") `);
        await queryRunner.query(`CREATE TABLE "paciente" ("id" SERIAL NOT NULL, "nombres" character varying NOT NULL, "apellidos" character varying NOT NULL, "cedula" character varying NOT NULL, "fecha_nacimiento" date NOT NULL, "telefono" character varying NOT NULL, CONSTRAINT "PK_cbcb7985432e4b49d32c5243867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."servicio_estado_enum" AS ENUM('default', 'descargado', 'facturado')`);
        await queryRunner.query(`CREATE TABLE "servicio" ("id" SERIAL NOT NULL, "registro" date NOT NULL, "descripcion" character varying NOT NULL, "precio" double precision NOT NULL, "estado" "public"."servicio_estado_enum" NOT NULL DEFAULT 'default', "tipo_suministro" character varying, "zona_cuerpo" character varying, "tipo_examen" text, "medico_asignado" character varying, "procedimiento" text, "type" character varying NOT NULL, CONSTRAINT "PK_a589f335f4fc94f913c9f86e608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe8aaafa3657b8405750898237" ON "servicio" ("type") `);
        await queryRunner.query(`CREATE TABLE "linea_transaccion" ("id" SERIAL NOT NULL, "iva" integer, "subtotal" double precision, "descuento" double precision, "nota_venta" character varying, "type" character varying NOT NULL, "servicioId" integer, "productoId" integer, "facturaId" integer, "descargoId" integer, CONSTRAINT "PK_cf78c94097504abcc179fa28e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_264495581ee6fd1ee11944b926" ON "linea_transaccion" ("type") `);
        await queryRunner.query(`CREATE TYPE "public"."producto_estado_enum" AS ENUM('default', 'descargado', 'facturado')`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "descripcion" character varying NOT NULL, "precio" double precision NOT NULL, "estado" "public"."producto_estado_enum" NOT NULL DEFAULT 'default', "fecha_ingreso" date, "fecha_salida" date, "valor_nutritivo" character varying, "tipo" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e2d622a8b74d54d4c25f94aa0" ON "producto" ("type") `);
        await queryRunner.query(`ALTER TABLE "documento" ADD CONSTRAINT "FK_59312c823e40afdf05748f5c16e" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documento" ADD CONSTRAINT "FK_799f562e7116756a63015a28799" FOREIGN KEY ("facturaId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_e0e2ebc2f8c12f61e6214236ecc" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_fc8d05787e73dec666adc7ae9fd" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2" FOREIGN KEY ("facturaId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_463bdbc5f927b7ca2dc6e763644" FOREIGN KEY ("descargoId") REFERENCES "documento"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_463bdbc5f927b7ca2dc6e763644"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_fc8d05787e73dec666adc7ae9fd"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_e0e2ebc2f8c12f61e6214236ecc"`);
        await queryRunner.query(`ALTER TABLE "documento" DROP CONSTRAINT "FK_799f562e7116756a63015a28799"`);
        await queryRunner.query(`ALTER TABLE "documento" DROP CONSTRAINT "FK_59312c823e40afdf05748f5c16e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e2d622a8b74d54d4c25f94aa0"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TYPE "public"."producto_estado_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_264495581ee6fd1ee11944b926"`);
        await queryRunner.query(`DROP TABLE "linea_transaccion"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe8aaafa3657b8405750898237"`);
        await queryRunner.query(`DROP TABLE "servicio"`);
        await queryRunner.query(`DROP TYPE "public"."servicio_estado_enum"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca073bb4219eecc55d79092956"`);
        await queryRunner.query(`DROP TABLE "documento"`);
        await queryRunner.query(`DROP TYPE "public"."documento_estado_enum"`);
    }

}
