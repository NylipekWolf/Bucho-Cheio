import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-sales-customers-totals',
  templateUrl: './page-sales-customers-totals.component.html',
  styleUrl: './page-sales-customers-totals.component.scss',
})
export class PageSalesCustomersTotalsComponent {
  @Input() recentlyPaid = 0;
  @Input() overdueInvoices = 0;
  @Input() openBalance = 0;
  @Input() estimates = 0;
}
