import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { IngredienteFilter } from './filters/ingrediente-filter.interface';
import { IngredienteRequest } from './requests/ingrediente-request.interface';
import { IngredienteResponse } from './responses/ingrediente-response.interface';

const base = `${environment.base}/ingrediente`;
@Injectable()
export class IngredienteService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: IngredienteFilter): Observable<IngredienteResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });

    return this._httpClient.get<IngredienteResponse[]>(base, {
      params,
    });
  }
  public adicionar(
    request?: IngredienteRequest
  ): Observable<IngredienteResponse> {
    return this._httpClient.post<IngredienteResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
  public atualizar(
    request?: IngredienteRequest
  ): Observable<IngredienteResponse> {
    return this._httpClient.post<IngredienteResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
}
