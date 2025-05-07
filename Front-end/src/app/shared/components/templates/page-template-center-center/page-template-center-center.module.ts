import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateCenterCenterComponent } from './page-template-center-center.component';
import { PageTemplateModule } from '../page-template/page-template.module';

@NgModule({
  declarations: [PageTemplateCenterCenterComponent],
  imports: [CommonModule, PageTemplateModule],
  exports: [PageTemplateCenterCenterComponent],
})
export class PageTemplateCenterCenterModule {}
