import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCardStockHistoryComponent } from './page-card-stock-history.component';
import { PageTemplateCardModule } from '../templates/page-template-card/page-template-card.module';
import { ListTemplateModule } from '../templates/list-template/list-template.module';

@NgModule({
  declarations: [PageCardStockHistoryComponent],
  imports: [CommonModule, PageTemplateCardModule, ListTemplateModule],
  exports: [PageCardStockHistoryComponent],
})
export class PageCardStockHistoryModule {}
