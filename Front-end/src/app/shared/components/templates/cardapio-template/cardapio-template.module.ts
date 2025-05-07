import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { CardapioTemplateComponent } from './cardapio-template.component';
import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [CardapioTemplateComponent],
  imports: [ButtonModule, CommonModule, DataViewModule, DividerModule],
  exports: [CardapioTemplateComponent],
})
export class CardapioTemplateModule {}
