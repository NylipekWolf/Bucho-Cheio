import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCardLaborHistoryComponent } from './page-card-labor-history.component';
import { PageTemplateCardModule } from '../templates/page-template-card/page-template-card.module';
import { ListTemplateModule } from '../templates/list-template/list-template.module';

@NgModule({
  declarations: [PageCardLaborHistoryComponent],
  imports: [CommonModule, PageTemplateCardModule, ListTemplateModule],
  exports: [PageCardLaborHistoryComponent],
})
export class PageCardLaborHistoryModule {}
