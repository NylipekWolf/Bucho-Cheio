import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivateLoginRoute,
  canActivateSignIn,
} from '@core/guards/can-activate.guards';
import { canMatchAuthorizedUrl } from '@core/guards/can-match.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
    // canActivate: [canActivateLoginRoute],
  },
  {
    path: 'site',
    loadChildren: () =>
      import('./modules/site/site.module').then((m) => m.SiteModule),
    // canActivate: [canActivateSignIn],
  },
  {
    path: 'page-not-found',
    loadChildren: () =>
      import('./modules/page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
