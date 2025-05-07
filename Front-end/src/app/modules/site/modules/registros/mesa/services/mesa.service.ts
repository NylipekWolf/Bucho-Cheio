import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { MesaFilter } from './filters/mesa-filter.interface';
import { MesaResponse } from './responses/mesa-response.interface';
import { MesaRequest } from './requests/mesa-request.interface';

const base = `${environment.base}/mesa`;
@Injectable()
export class MesaService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: MesaFilter): Observable<MesaResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<MesaResponse[]>(`${base}`, {
      params,
    });
  }
  public adicionar(request?: MesaRequest): Observable<MesaResponse> {
    return this._httpClient.post<MesaResponse>(base, request);
  }
  public quantidadeLugares(request?: MesaRequest): Observable<MesaResponse> {
    return this._httpClient.put<MesaResponse>(
      `${base}/quantidadeLugares`,
      request
    );
  }
}
