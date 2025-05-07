import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonOverlayTemplateComponent } from './button-overlay-template.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PageTemplateCardModule } from '../page-template-card/page-template-card.module';

@NgModule({
  declarations: [ButtonOverlayTemplateComponent],
  imports: [
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    PageTemplateCardModule,
  ],
  exports: [ButtonOverlayTemplateComponent],
})
export class ButtonOverlayTemplateModule {}
