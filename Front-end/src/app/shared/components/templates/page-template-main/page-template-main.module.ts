import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateMainComponent } from './page-template-main.component';
import { PageTemplateModule } from '../page-template/page-template.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [PageTemplateMainComponent],
  imports: [CommonModule, PageTemplateModule, BreadcrumbModule],
  exports: [PageTemplateMainComponent],
})
export class PageTemplateMainModule {}
