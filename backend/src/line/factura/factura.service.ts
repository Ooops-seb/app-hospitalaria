import { Injectable } from '@nestjs/common';
import { LineaTransaccionService } from '../linea-transaccion.service';

@Injectable()
export class FacturaService extends LineaTransaccionService {}
