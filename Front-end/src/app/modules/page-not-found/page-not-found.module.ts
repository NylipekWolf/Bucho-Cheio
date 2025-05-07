import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page/page-not-found.component';
import { PageTemplateCenterCenterModule } from '@shared/components/templates/page-template-center-center/page-template-center-center.module';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    PageTemplateCenterCenterModule,
    ButtonModule,
  ],
})
export class PageNotFoundModule {}
