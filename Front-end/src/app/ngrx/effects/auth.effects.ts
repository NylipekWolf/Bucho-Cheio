import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  loginDsi,
  loginDsiError,
  loginDsiSuccess,
  logoutDefaultSignIn,
  logoutDefaultSignInSuccess,
} from '../app.actions';

import { UserService } from '@core/services/security/user.service';
import { TokenResponse } from '@core/services/security/interfaces/responses/token.response';
import { AuthService } from '@core/services/security/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  loginDefaultSignIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loginDsi),
      exhaustMap((action) => {
        return this._authService.defaultSignIn(action.request).pipe(
          map((response: TokenResponse) => {
            this._userService.setDsiTkn(response.token);
            const userInfo = this._userService.getUserInfoFromTkn();
            return loginDsiSuccess({ userInfo });
          }),
          catchError(() => of(loginDsiError()))
        );
      })
    )
  );

  logoutDefaultSignIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logoutDefaultSignIn),
      map(() => {
        this._userService.logout();
        return logoutDefaultSignInSuccess();
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _authService: AuthService,
    private readonly _userService: UserService
  ) {}
}
