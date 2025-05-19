import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from 'config/database.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServiceModule } from './service/service.module';
import { LineModule } from './line/line.module';
import { DocumentModule } from './document/document.module';
import { ProductModule } from './product/product.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      databaseConfig.asProvider() as Partial<PostgresConnectionOptions>,
    ),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    ServiceModule,
    LineModule,
    DocumentModule,
    ProductModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
