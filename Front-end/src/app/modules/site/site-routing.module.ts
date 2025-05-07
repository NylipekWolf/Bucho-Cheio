import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './page/site.component';
import { canMatchSiteAuthorizedUrl } from '@core/guards/can-match.guards';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.DashboardModule),
        // canMatch: [canMatchSiteAuthorizedUrl],
      },
      {
        path: 'registrar-ingrediente',
        loadChildren: () =>
          import('./modules/registros/ingrediente/ingrediente.module').then(
            (m) => m.IngredienteModule
          ),
      },
      {
        path: 'registrar-compras',
        loadChildren: () =>
          import('./modules/registros/compras/compras.module').then(
            (m) => m.ComprasModule
          ),
      },
      {
        path: 'registrar-mesa',
        loadChildren: () =>
          import('./modules/registros/mesa/mesa.module').then(
            (m) => m.MesaModule
          ),
      },
      {
        path: 'registrar-fornecedor',
        loadChildren: () =>
          import('./modules/registros/fornecedor/fornecedor.module').then(
            (m) => m.FornecedorModule
          ),
      },
      {
        path: 'registrar-cardapio',
        loadChildren: () =>
          import('./modules/registros/cardapio/cardapio.module').then(
            (m) => m.CardapioModule
          ),
      },
      {
        path: 'mesa',
        loadChildren: () =>
          import('./modules/operacional/mesa/mesa.module').then(
            (m) => m.MesaModule
          ),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./modules/settings/settings-user/settings-user.module').then(
            (m) => m.SettingsUserModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import(
            './modules/settings/settings-profile/settings-profile.module'
          ).then((m) => m.SettingsProfileModule),
      },
      {
        path: 'not-authorized',
        loadChildren: () =>
          import('./modules/not-authorized/not-authorized.module').then(
            (m) => m.NotAuthorizedModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
