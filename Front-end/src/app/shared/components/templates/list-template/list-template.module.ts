import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTemplateComponent } from './list-template.component';
import { NobodyHereModule } from '@shared/components/nobody-here/nobody-here.module';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ListTemplateComponent],
  imports: [CommonModule, NobodyHereModule, DividerModule, ButtonModule],
  exports: [ListTemplateComponent],
})
export class ListTemplateModule {}
