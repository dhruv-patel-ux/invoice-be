import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Invoice)
    private invoiceItemRepository: Repository<InvoiceItem>
  ) { }

  async create(createInvoiceDto: CreateInvoiceDto) {
    try {
      const invoice = new Invoice();
      invoice.invoiceNumber = this.generateInvoiceNumber();
      invoice.invoiceDate = new Date();
      invoice.fromName = createInvoiceDto.fromDetails.name;
      invoice.fromAddress = createInvoiceDto.fromDetails.address;
      invoice.toName = createInvoiceDto.toDetails.name;
      invoice.toAddress = createInvoiceDto.toDetails.address;
  
      invoice.items = createInvoiceDto.items.map(item => {
        const invoiceItem = new InvoiceItem();
        invoiceItem.itemName = item.itemName;
        invoiceItem.quantity = item.quantity;
        invoiceItem.rate = item.rate;
        invoiceItem.total = item.quantity * item.rate;
        return invoiceItem;
      });
  
      invoice.totalAmount = invoice.items.reduce((sum, item) => sum + item.total, 0);
      return this.invoiceRepository.save(invoice);
      // return { status: 201, message: "Invoice Added Successfully" }
    } catch (e) {
      return { status: 500, message: e.message }
    }
  }

  async findAll(sort: 'ASC' | 'DESC' = 'DESC'): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: ['items'],
      order: { invoiceDate: sort }
    });
  }

  async findOne(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['items']
    });
  }

  private generateInvoiceNumber(): string {
    return `INV-${Date.now()}`;
  }
}

