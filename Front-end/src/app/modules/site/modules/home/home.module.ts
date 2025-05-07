import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { ListTemplateModule } from '@shared/components/templates/list-template/list-template.module';
import { PageCardTotalGraphModule } from '@shared/components/page-card-total-graph/page-card-total-graph.module';
import { PageSalesCustomersTotalsModule } from '@shared/components/page-sales-customers-totals/page-sales-customers-totals.module';
import { HomeComponent } from './page/home.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    ChartModule,
    CommonModule,
    HomeRoutingModule,
    PageTemplateMainModule,
    PageTemplateCardModule,
    ListTemplateModule,
    PageCardTotalGraphModule,
    PageSalesCustomersTotalsModule,
  ],
  providers: [CurrencyPipe],
})
export class DashboardModule {}
