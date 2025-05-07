import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env';
import { AuthRequest } from './interfaces/requests/auth.request';
import { TokenResponse } from './interfaces/responses/token.response';

const _BASE_URL = `${environment.base}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly _httpClient: HttpClient) {}

  defaultSignIn(request: AuthRequest): Observable<TokenResponse> {
    return this._httpClient.post<TokenResponse>(`${_BASE_URL}/dsi`, request);
  }
}
