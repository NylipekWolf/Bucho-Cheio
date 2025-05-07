import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTemplateCardSaveComponent } from './page-template-card-save.component';
import { PageTemplateCardModule } from '../page-template-card/page-template-card.module';
import { ButtonModule } from 'primeng/button';
import { ButtonOverlayTemplateModule } from '../button-overlay-template/button-overlay-template.module';

@NgModule({
  declarations: [PageTemplateCardSaveComponent],
  imports: [
    CommonModule,
    PageTemplateCardModule,
    ButtonModule,
    ButtonOverlayTemplateModule,
  ],
  exports: [PageTemplateCardSaveComponent],
})
export class PageTemplateCardSaveModule {}
