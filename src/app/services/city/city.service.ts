import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { ReadBranchDTO } from '../../models/branch/read-branch-dto';
import { ResponseWrapper } from '../../models/responseWrapper/response-wrapper';
import { ReadCityDTO } from '../../models/city/read-city-dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  GetAllAsync(): Observable<ResponseWrapper<ReadCityDTO[]>> {
    return this.httpClient.get<ResponseWrapper<ReadCityDTO[]>>(`${this.apiUrl}/Cities`);
  }
  GetByIdAsync(id: number): Observable<ResponseWrapper<ReadCityDTO>> {
    return this.httpClient.get<ResponseWrapper<ReadCityDTO>>(`${this.apiUrl}/Cities/${id}`);
  }
}
