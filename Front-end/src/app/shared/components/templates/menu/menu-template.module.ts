import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuTemplateComponent } from './menu-template.component';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [MenuTemplateComponent],
  imports: [
    AvatarModule,
    ButtonModule,
    CommonModule,
    DividerModule,
    MenuModule,
    PanelMenuModule,
  ],
  exports: [MenuTemplateComponent],
})
export class MenuTemplateModule {}
