import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ResponseWrapper } from '../../models/responseWrapper/response-wrapper';
import { ReadBranchDTO } from '../../models/branch/read-branch-dto';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  GetAllAsync(): Observable<ResponseWrapper<ReadBranchDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadBranchDTO[]>>(`${this.apiUrl}/Branch`);
  }
  GetByIdAsync(id: number): Observable<ResponseWrapper<ReadBranchDTO>> {
    return this.httpClient.get<ResponseWrapper<ReadBranchDTO>>(`${this.apiUrl}/Branch/${id}`);
  }
  GetAllByCityId(id: number): Observable<ResponseWrapper<ReadBranchDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadBranchDTO[]>>(`${this.apiUrl}/Branch/GetAllByCityId/${id}`);
  }
}
