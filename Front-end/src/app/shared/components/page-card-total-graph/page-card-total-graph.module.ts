import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PageCardTotalGraphComponent } from './page-card-total-graph.component';

@NgModule({
  declarations: [PageCardTotalGraphComponent],
  imports: [CommonModule],
  exports: [PageCardTotalGraphComponent],
  providers: [CurrencyPipe],
})
export class PageCardTotalGraphModule {}
