import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './page/site.component';
import { FormsModule } from '@angular/forms';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DividerModule } from 'primeng/divider';
import { StoreDropdownModule } from '@shared/components/store-dropdown/store-dropdown.module';
import { UserInfoModule } from '@shared/components/user-info/user-info.module';
import { MenuTemplateModule } from '@shared/components/templates/menu/menu-template.module';

@NgModule({
  declarations: [SiteComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    FormsModule,
    PanelMenuModule,
    DividerModule,
    StoreDropdownModule,
    UserInfoModule,
    MenuTemplateModule,
  ],
})
export class SiteModule {}
