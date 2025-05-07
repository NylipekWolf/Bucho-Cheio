import { createAction, props } from '@ngrx/store';
import { ProfileModel, UserInfoModel } from './app.models';
import { AuthRequest } from '@core/services/security/interfaces/requests/auth.request';

// LOGIN ACTIONS

export const loginDsi = createAction(
  '[Login] Default Sign In',
  props<{ request: AuthRequest }>()
);

export const loginDsiSuccess = createAction(
  '[Login] Default Sign In - Success',
  props<{ userInfo: UserInfoModel }>()
);

export const loginDsiError = createAction('[Login] Default Sign In - Error');

// LOGOUT ACTIONS

export const logoutDefaultSignIn = createAction('[Logout] Default Sign In');

export const logoutDefaultSignInSuccess = createAction(
  '[Logout] Default Sign In - Success'
);

export const profileSelected = createAction(
  '[Login] Profile Selected',
  props<{ profileSelected: ProfileModel }>()
);

export const profileSelectedSuccess = createAction(
  '[Login] Profile Selected Success'
);
