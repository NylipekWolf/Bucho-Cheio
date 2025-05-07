import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { ProfileResponse } from './responses/profile-response.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProfileRequest } from './requests/profile-request.interface';
import { ProfileFilterRequest } from './requests/profile-filter-request.interface';

const profileBase = `${environment.base}/profile`;

@Injectable()
export class ProfileService {
  constructor(private readonly _httpClient: HttpClient) {}

  public search(query?: ProfileFilterRequest): Observable<ProfileResponse[]> {
    const params = new HttpParams({ fromObject: Object(query) });
    return this._httpClient.get<ProfileResponse[]>(profileBase, { params });
  }

  public insert(request: ProfileRequest): Observable<ProfileResponse> {
    return this._httpClient.post<ProfileResponse>(profileBase, request);
  }

  public update(request: ProfileRequest): Observable<ProfileResponse> {
    return this._httpClient.put<ProfileResponse>(profileBase, request);
  }

  public activateDeactivate(profileId: number): Observable<void> {
    return this._httpClient.put<void>(
      `${profileBase}/activate-deactivate/${profileId}`,
      {}
    );
  }

  public functionalitiesId(profileId: number): Observable<number[]> {
    return this._httpClient.get<number[]>(
      `${profileBase}/functionalities/${profileId}`
    );
  }
}
