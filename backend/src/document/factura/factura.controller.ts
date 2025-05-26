import { Controller } from '@nestjs/common';
import { DocumentController } from '../document.controller';

@Controller()
export class FacturaController extends DocumentController {}
