import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../../models/responseWrapper/response-wrapper';
import { ReadCashierDTO } from '../../models/cashier/read-cashier-dto';
import { InsertCashierDTO } from '../../models/cashier/insert-cashier-dto';
import { UpdateCashierDTO } from '../../models/cashier/update-cashier-dto';

@Injectable({
  providedIn: 'root'
})
export class CashierService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  GetAllAsync(): Observable<ResponseWrapper<ReadCashierDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadCashierDTO[]>>(`${this.apiUrl}/Cashier`);
  }
  GetByIdAsync(id: number): Observable<ResponseWrapper<ReadCashierDTO>> {
    return this.httpClient.get<ResponseWrapper<ReadCashierDTO>>(`${this.apiUrl}/Cashier/${id}`);
  }
  GetTotalPages(pgSize: number): Observable<ResponseWrapper<number>> {
    return this.httpClient.get<ResponseWrapper<number>>(`${this.apiUrl}/Cashier/TPages/${pgSize}`);
  }
  GetAllPaginatedAsync(pgSize: number, pgNumber: number): Observable<ResponseWrapper<ReadCashierDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadCashierDTO[]>>(`${this.apiUrl}/Cashier/Pagination/${pgSize}/${pgNumber}`);
  }
  GetTotalFilteredPages(pgSize: number,filterText:string): Observable<ResponseWrapper<number>> {
    return this.httpClient.get<ResponseWrapper<number>>(`${this.apiUrl}/Cashier/TPagPages/${pgSize}/${filterText}`);
  }
  GetFilteredPaginatedAsync(pgSize: number, pgNumber: number,filterText:string): Observable<ResponseWrapper<ReadCashierDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadCashierDTO[]>>(`${this.apiUrl}/Cashier/PagFilter/${pgSize}/${pgNumber}/${filterText}`);
  }
  AddAsync(entity: InsertCashierDTO): Observable<ResponseWrapper<ReadCashierDTO>> {
    return this.httpClient.post<ResponseWrapper<ReadCashierDTO>>(`${this.apiUrl}/Cashier`, entity);
  }
  UpdateAsync(entity: UpdateCashierDTO): Observable<ResponseWrapper<ReadCashierDTO>> {
    return this.httpClient.put<ResponseWrapper<ReadCashierDTO>>(`${this.apiUrl}/Cashier`, entity);
  }
  DeleteAsync(id: number): Observable<ResponseWrapper<ReadCashierDTO>> {
    return this.httpClient.delete<ResponseWrapper<ReadCashierDTO>>(`${this.apiUrl}/Cashier/${id}`);
  }
}
