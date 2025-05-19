import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntities1747627257540 implements MigrationInterface {
    name = 'NewEntities1747627257540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paciente" ("id" SERIAL NOT NULL, "nombres" character varying NOT NULL, "apellidos" character varying NOT NULL, "cedula" character varying NOT NULL, "fecha_nacimiento" date NOT NULL, "telefono" character varying NOT NULL, CONSTRAINT "PK_cbcb7985432e4b49d32c5243867" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documento_transaccional" ("id" SERIAL NOT NULL, "nro" integer NOT NULL, "fecha" date NOT NULL, "valor" double precision NOT NULL, "pacienteId" integer, CONSTRAINT "PK_6a0317ea2169a064d3d85cbf4b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factura" ("id" SERIAL NOT NULL, "clave_acceso" character varying NOT NULL, "documentoId" integer, CONSTRAINT "PK_ca804984009ea42a7b46adb9a86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "descripcion" character varying NOT NULL, "precio" double precision NOT NULL, "fecha_ingreso" date, "fecha_salida" date, "valor_nutritivo" character varying, "tipo" character varying, "type" character varying NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e2d622a8b74d54d4c25f94aa0" ON "producto" ("type") `);
        await queryRunner.query(`CREATE TABLE "linea_transaccion" ("id" SERIAL NOT NULL, "cantidad" integer NOT NULL, "precio_unitario" double precision NOT NULL, "facturaId" integer, "productoId" integer, "servicioId" integer, CONSTRAINT "PK_cf78c94097504abcc179fa28e61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servicio" ("id" SERIAL NOT NULL, "registro" date NOT NULL, "descripcion" character varying NOT NULL, "precio" double precision NOT NULL, "tipo_suministro" character varying, "medico_asignado" character varying, "procedimiento" text, "zona_cuerpo" character varying, "tipo_examen" text, "type" character varying NOT NULL, CONSTRAINT "PK_a589f335f4fc94f913c9f86e608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe8aaafa3657b8405750898237" ON "servicio" ("type") `);
        await queryRunner.query(`ALTER TABLE "documento_transaccional" ADD CONSTRAINT "FK_497d1ac9412498b90039e9f2343" FOREIGN KEY ("pacienteId") REFERENCES "paciente"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factura" ADD CONSTRAINT "FK_cfd1b552a0764951dc5f5809b4f" FOREIGN KEY ("documentoId") REFERENCES "documento_transaccional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2" FOREIGN KEY ("facturaId") REFERENCES "factura"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_fc8d05787e73dec666adc7ae9fd" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" ADD CONSTRAINT "FK_e0e2ebc2f8c12f61e6214236ecc" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_e0e2ebc2f8c12f61e6214236ecc"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_fc8d05787e73dec666adc7ae9fd"`);
        await queryRunner.query(`ALTER TABLE "linea_transaccion" DROP CONSTRAINT "FK_0ac0a8050adbb81dfcc5f782fa2"`);
        await queryRunner.query(`ALTER TABLE "factura" DROP CONSTRAINT "FK_cfd1b552a0764951dc5f5809b4f"`);
        await queryRunner.query(`ALTER TABLE "documento_transaccional" DROP CONSTRAINT "FK_497d1ac9412498b90039e9f2343"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe8aaafa3657b8405750898237"`);
        await queryRunner.query(`DROP TABLE "servicio"`);
        await queryRunner.query(`DROP TABLE "linea_transaccion"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e2d622a8b74d54d4c25f94aa0"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "factura"`);
        await queryRunner.query(`DROP TABLE "documento_transaccional"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
    }

}
