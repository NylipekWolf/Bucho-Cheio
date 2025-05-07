import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { FunctionalityResponse } from './responses/functionality-response.interface';

const functionalityBase = `${environment.base}/functionality`;

@Injectable()
export class FunctionalityService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(): Observable<FunctionalityResponse[]> {
    return this._httpClient.get<FunctionalityResponse[]>(functionalityBase);
  }
}
