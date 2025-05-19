import { DocumentoTransaccional } from 'src/document/entities/document.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  cedula: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column()
  telefono: string;

  @OneToMany(() => DocumentoTransaccional, (documento) => documento.paciente)
  documentos: DocumentoTransaccional[];
}
