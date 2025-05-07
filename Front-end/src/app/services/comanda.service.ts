import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { ComandaResponse } from './responses/comanda-response.interface';

const base = `${environment.base}/comanda`;
@Injectable()
export class ComandaService {
  constructor(private readonly _httpClient: HttpClient) {}

  public buscarComanda(idMesa: number): Observable<ComandaResponse[]> {
    const params = new HttpParams({ fromObject: { id: idMesa } });
    return this._httpClient.get<ComandaResponse[]>(
      `../../assets/mocks/comanda.mock.json`,
      { params }
    );
    // return this._httpClient.get<ComandaResponse[]>(`${base}/comanda`);
  }
}
