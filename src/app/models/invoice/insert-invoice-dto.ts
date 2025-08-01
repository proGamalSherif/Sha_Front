export interface InsertInvoiceDTO {
    customerName: string;
    cashierID: number;
    branchID: number;
    invoiceDetails : InsertInvoiceDetailsDTO[];
}

export interface InsertInvoiceDetailsDTO{
    invoiceHeaderID?:number;
    itemName:string;
    itemCount:number;
    itemPrice:number;
}