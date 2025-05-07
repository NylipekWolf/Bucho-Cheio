import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionStorageService } from './session-storage.service';
import {
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { ProfileModel, UserInfoModel } from '../../../ngrx/app.models';
import {
  initialStateProfile,
  initialStateUserInfoModel,
} from '../../../ngrx/app.reducers';
import { jwtDecode } from 'jwt-decode';
import { loginDsiSuccess, profileSelected } from '../../../ngrx/app.actions';
import { getFullPathFromSegments } from '../../../utils/route.utils';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _unsub$ = new Subject<void>();
  public isLoggingOut = false;
  constructor(
    private readonly _store: Store,
    private readonly _storageService: SessionStorageService,
    private readonly _router: Router
  ) {}

  logout(): void {
    this._storageService.removeDsiTkn();
    this._storageService.removeProfile();
    this._unsub$.next();
    this._unsub$.complete();
    this._router.navigateByUrl('/login');
  }

  setDsiTkn(tkn: string): void {
    this._storageService.setDsiTkn(tkn);
  }

  hasTkn(): boolean {
    return this._storageService.hasDsiTkn();
  }

  getUserInfoFromTkn(): UserInfoModel {
    if (!this._storageService.hasDsiTkn()) return initialStateUserInfoModel;
    const dsiToken = this._storageService.getDsiTkn();
    if (dsiToken) {
      const decoded = jwtDecode<any>(dsiToken);
      return decoded['userInfo'] as UserInfoModel;
    }
    return initialStateUserInfoModel;
  }

  getProfile(): number {
    return this._storageService.getProfile();
  }

  setProfile(profile: number) {
    this._storageService.setProfile(profile);
  }

  // GUARD

  canActivateSignIn(): boolean {
    if (!this.hasTkn()) {
      this._router.navigateByUrl('/login');
    }

    const userInfoModel = this.getUserInfoFromTkn();
    const profileFromSession = this.getProfile();
    this._store.dispatch(loginDsiSuccess({ userInfo: userInfoModel }));
    const profile = userInfoModel.profiles.find(
      (p) => p.id === profileFromSession
    ); // choose the first profile from list
    if (profile) {
      this._store.dispatch(profileSelected({ profileSelected: profile }));
    }

    return true;
  }

  canActivateLoginRoute(state: RouterStateSnapshot): boolean {
    if (this.hasTkn()) {
      this._router.navigateByUrl('/site/dashboard');
    }
    return true;
  }

  canMatchAuthorizedUrl(
    route: Route,
    segments: UrlSegment[],
    path?: string
  ): boolean {
    const profileId = this.getProfile();
    const userInfo = this.getUserInfoFromTkn();
    const profile = userInfo.profiles.find((p) => p.id === profileId);

    const fullPath = path
      ? `${path}${getFullPathFromSegments(segments)}`
      : getFullPathFromSegments(segments);
    if (
      fullPath === '/view-print' &&
      profile?.authorizedButtons.includes(507)
    ) {
      return true;
    }
    if (profile) {
      if (
        profile.authorizedUrls &&
        !profile.authorizedUrls.includes(fullPath)
      ) {
        this._router.navigateByUrl('/site/not-authorized');
      }
    }

    return true;
  }
}
