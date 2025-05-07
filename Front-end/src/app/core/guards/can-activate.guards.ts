import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '@core/services/security/user.service';

export const canActivateSignIn: CanActivateFn = () => {
  return inject(UserService).canActivateSignIn();
};

export const canActivateLoginRoute: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserService).canActivateLoginRoute(state);
};
