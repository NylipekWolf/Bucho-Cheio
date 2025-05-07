import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { profileSelected, profileSelectedSuccess } from '../app.actions';
import { UserService } from '@core/services/security/user.service';

@Injectable({ providedIn: 'root' })
export class ProfileEffects {
  profileSelected$ = createEffect(() =>
    this._actions$.pipe(
      ofType(profileSelected),
      map((action) => {
        const profile = action.profileSelected;
        if (profile) {
          this._userService.setProfile(action.profileSelected.id);
        }
        return profileSelectedSuccess();
      })
    )
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly _userService: UserService
  ) {}
}
