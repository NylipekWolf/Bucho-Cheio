import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSalesCustomersTotalsComponent } from './page-sales-customers-totals.component';
import { PageCardTotalGraphModule } from '../page-card-total-graph/page-card-total-graph.module';

@NgModule({
  declarations: [PageSalesCustomersTotalsComponent],
  imports: [CommonModule, PageCardTotalGraphModule],
  exports: [PageSalesCustomersTotalsComponent],
})
export class PageSalesCustomersTotalsModule {}
