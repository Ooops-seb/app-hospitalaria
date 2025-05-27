import { Documento } from 'src/document/entities/Documento.entity';
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

  @OneToMany(() => Documento, (documento) => documento.paciente)
  documentos: Documento[];
}
