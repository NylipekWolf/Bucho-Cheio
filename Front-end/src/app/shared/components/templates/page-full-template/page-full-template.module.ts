import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageFullTemplateComponent } from './page-full-template.component';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [PageFullTemplateComponent],
  imports: [CommonModule, SidebarModule],
  exports: [PageFullTemplateComponent],
})
export class PageFullTemplateModule {}
