import { InsertInvoiceDetailsDTO } from "./insert-invoice-dto";

export interface UpdateInvoiceDTO {
    id:number;
    customerName: string;
    cashierID: number;
    branchID: number;
    invoiceDetails: InsertInvoiceDetailsDTO[];
}
