import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { CardapioFilter } from './filters/cardapio-filter.interface';
import { CardapioResponse } from './responses/cardapio-response.interface';
import { CardapioRequest } from './requests/cardapio-request.interface';

const customerBase = `${environment.base}/cardapio`;
@Injectable()
export class CardapioService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: CardapioFilter): Observable<CardapioResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<CardapioResponse[]>(
      '../../../../../../../assets/mocks/compras.mock.json'
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
  public adicionar(request?: CardapioRequest): Observable<CardapioResponse> {
    return this._httpClient.post<CardapioResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
  public atualizar(request?: CardapioRequest): Observable<CardapioResponse> {
    return this._httpClient.post<CardapioResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
}
