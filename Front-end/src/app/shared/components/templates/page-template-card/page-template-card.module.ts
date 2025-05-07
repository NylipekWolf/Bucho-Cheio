import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateCardComponent } from './page-template-card.component';
import { PageTemplateModule } from '../page-template/page-template.module';

@NgModule({
  declarations: [PageTemplateCardComponent],
  imports: [CommonModule, PageTemplateModule],
  exports: [PageTemplateCardComponent],
})
export class PageTemplateCardModule {}
