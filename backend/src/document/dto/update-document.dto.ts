import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoTransaccionalDto } from './create-document.dto';

export class UpdateDocumentoTransaccionalDto extends PartialType(
  CreateDocumentoTransaccionalDto,
) {}
