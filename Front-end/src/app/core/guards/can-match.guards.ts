import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { UserService } from '@core/services/security/user.service';

export const canMatchAuthorizedUrl: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(UserService).canMatchAuthorizedUrl(route, segments);
};

export const canMatchSiteAuthorizedUrl: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return inject(UserService).canMatchAuthorizedUrl(route, segments, '/site');
};
