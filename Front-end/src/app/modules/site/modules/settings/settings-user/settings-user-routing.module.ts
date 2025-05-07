import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsUserComponent } from './page/settings-user.component';

const routes: Routes = [{ path: '', component: SettingsUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsUserRoutingModule {}
