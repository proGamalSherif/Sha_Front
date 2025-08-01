import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../../models/responseWrapper/response-wrapper';
import { ReadInvoiceDTO } from '../../models/invoice/read-invoice-dto';
import { InsertInvoiceDTO } from '../../models/invoice/insert-invoice-dto';
import { UpdateInvoiceDTO } from '../../models/invoice/update-invoice-dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  GetAllAsync(): Observable<ResponseWrapper<ReadInvoiceDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadInvoiceDTO[]>>(`${this.apiUrl}/Invoice`);
  }
  GetByIdAsync(id: number): Observable<ResponseWrapper<ReadInvoiceDTO>> {
    return this.httpClient.get<ResponseWrapper<ReadInvoiceDTO>>(`${this.apiUrl}/Invoice/${id}`);
  }
  AddAsync(entity: InsertInvoiceDTO): Observable<ResponseWrapper<ReadInvoiceDTO>> {
    return this.httpClient.post<ResponseWrapper<ReadInvoiceDTO>>(`${this.apiUrl}/Invoice`, entity);
  }
  UpdateAsync(entity: UpdateInvoiceDTO): Observable<ResponseWrapper<ReadInvoiceDTO>> {
    return this.httpClient.put<ResponseWrapper<ReadInvoiceDTO>>(`${this.apiUrl}/Invoice`, entity);
  }
  DeleteAsync(id: number): Observable<ResponseWrapper<ReadInvoiceDTO>> {
    return this.httpClient.delete<ResponseWrapper<ReadInvoiceDTO>>(`${this.apiUrl}/Invoice/${id}`);
  }
}
