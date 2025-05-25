import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Documentos')
@Controller('documento')
export class DocumentController {}
