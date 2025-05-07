import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableTemplateComponent } from './table-template.component';
import { TableModule } from 'primeng/table';
import { NobodyHereModule } from '@shared/components/nobody-here/nobody-here.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [TableTemplateComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    NobodyHereModule,
    ButtonModule,
    TagModule,
  ],
  exports: [TableTemplateComponent],
  providers: [DatePipe],
})
export class TableTemplateModule {}
