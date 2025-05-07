import { ButtonOverlayTemplateModule } from './../button-overlay-template/button-overlay-template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateTemplateComponent } from './activate-template.component';

@NgModule({
  declarations: [ActivateTemplateComponent],
  imports: [CommonModule, ButtonOverlayTemplateModule],
  exports: [ActivateTemplateComponent],
})
export class ActivateTemplateModule {}
