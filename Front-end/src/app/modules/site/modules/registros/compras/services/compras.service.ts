import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { ComprasFilter } from './filters/compras-filter.interface';
import { ComprasResponse } from './responses/compras-response.interface';
import { ComprasRequest } from './requests/compras-request.interface';

const customerBase = `${environment.base}/compras`;
@Injectable()
export class ComprasService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: ComprasFilter): Observable<ComprasResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<ComprasResponse[]>(
      '../../../../../../../assets/mocks/compras.mock.json'
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
  public adicionar(request?: ComprasRequest): Observable<ComprasResponse> {
    return this._httpClient.post<ComprasResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
  public atualizar(request?: ComprasRequest): Observable<ComprasResponse> {
    return this._httpClient.post<ComprasResponse>(
      '../../../../../../../assets/mocks/compras.mock.json',
      request
    );
    // return this._httpClient.get<ComprasResponse[]>(customerBase, {
    //   params,
    // });
  }
}
