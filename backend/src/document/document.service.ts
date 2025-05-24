import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentService {
  // constructor(
  //   @InjectRepository(DocumentoTransaccional)
  //   private readonly documentoRepo: Repository<DocumentoTransaccional>,
  //   @InjectRepository(Paciente)
  //   private readonly pacienteRepo: Repository<Paciente>,
  // ) {}
  // async create(
  //   dto: CreateDocumentoTransaccionalDto,
  // ): Promise<DocumentoTransaccional> {
  //   const paciente = await this.pacienteRepo.findOneBy({ id: dto.paciente_id });
  //   if (!paciente) {
  //     throw new NotFoundException('Paciente no encontrado');
  //   }
  //   const documento = this.documentoRepo.create({
  //     ...dto,
  //     paciente,
  //   });
  //   return this.documentoRepo.save(documento);
  // }
  // findAll(): Promise<DocumentoTransaccional[]> {
  //   return this.documentoRepo.find();
  // }
  // async findOne(id: number): Promise<DocumentoTransaccional> {
  //   const doc = await this.documentoRepo.findOne({ where: { id } });
  //   if (!doc) throw new NotFoundException('Documento no encontrado');
  //   return doc;
  // }
  // async update(
  //   id: number,
  //   dto: UpdateDocumentoTransaccionalDto,
  // ): Promise<DocumentoTransaccional> {
  //   const documento = await this.findOne(id);
  //   if (dto.paciente_id !== undefined) {
  //     const paciente = await this.pacienteRepo.findOneBy({
  //       id: dto.paciente_id,
  //     });
  //     if (!paciente) {
  //       throw new NotFoundException('Paciente no encontrado');
  //     }
  //     documento.paciente = paciente;
  //   }
  //   Object.assign(documento, dto);
  //   return this.documentoRepo.save(documento);
  // }
  // async remove(id: number): Promise<void> {
  //   const doc = await this.findOne(id);
  //   await this.documentoRepo.remove(doc);
  // }
}
