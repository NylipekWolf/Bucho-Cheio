import { ActivatedRoute, Params, Router } from '@angular/router';

export function addQueryParam(
  router: Router,
  activatedRoute: ActivatedRoute,
  queryParams: Params
): void {
  router.navigate([], {
    relativeTo: activatedRoute,
    queryParams: queryParams,
    queryParamsHandling: 'merge',
  });
}

export function removeQueryParam(
  router: Router,
  activatedRoute: ActivatedRoute,
  keys: string[]
) {
  const snapshot = activatedRoute.snapshot;
  const params = { ...snapshot.queryParams };
  keys.forEach((key) => {
    delete params[key];
  });

  router.navigate([], { queryParams: params });
}
