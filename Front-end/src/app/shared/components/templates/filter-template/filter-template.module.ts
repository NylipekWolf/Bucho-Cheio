import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterTemplateComponent } from './filter-template.component';
import { ButtonOverlayTemplateModule } from '../button-overlay-template/button-overlay-template.module';

@NgModule({
  declarations: [FilterTemplateComponent],
  imports: [CommonModule, ButtonOverlayTemplateModule],
  exports: [FilterTemplateComponent],
})
export class FilterTemplateModule {}
