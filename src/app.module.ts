import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceItem } from './invoice/entities/invoice-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'invoice',
      entities: [Invoice, InvoiceItem],
      synchronize: true,
    }),
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
