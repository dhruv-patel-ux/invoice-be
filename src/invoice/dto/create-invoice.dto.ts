export class CreateInvoiceDto {
    fromDetails: {
      name:string,
      address:string
    }
    toDetails: {
      name:string,
      address:string
    };
    items: {
      itemName: string;
      quantity: number;
      rate: number;
    }[];
  }
  