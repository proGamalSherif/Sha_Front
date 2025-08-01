export interface ReadInvoiceDTO {
    id:number;
    invoicedate:Date;
    customerName:string;
    cashierID:number;
    cashierName:string;
    branchID:number;
    branchName:string;
    invoiceDetails: ReadInvoiceDetailsDTO[];
    totalPrice:number;
}

export interface ReadInvoiceDetailsDTO{
    invoiceHeaderID:number;
    itemName:string;
    itemCount:number;
    itemPrice:number;
}