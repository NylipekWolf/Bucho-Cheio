import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { SettingsUserRequest } from './requests/settings-user-request.interface';
import { SettingsUserResponse } from './responses/settings-user-response.interface';
import { Observable } from 'rxjs';
import { SettingsUserFilterRequest } from './requests/settings-user-filter-request.interface';

const userBase = `${environment.base}/user`;

@Injectable()
export class SettingsUserService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(
    query?: SettingsUserFilterRequest
  ): Observable<SettingsUserResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<SettingsUserResponse[]>(userBase, { params });
  }

  public insert(
    request: SettingsUserRequest
  ): Observable<SettingsUserResponse> {
    return this._httpClient.post<SettingsUserResponse>(userBase, request);
  }

  public update(
    request: SettingsUserRequest
  ): Observable<SettingsUserResponse> {
    return this._httpClient.put<SettingsUserResponse>(userBase, request);
  }

  public activateDeactivate(userId: number): Observable<void> {
    return this._httpClient.put<void>(
      `${userBase}/activate-deactivate/${userId}`,
      {}
    );
  }
}
