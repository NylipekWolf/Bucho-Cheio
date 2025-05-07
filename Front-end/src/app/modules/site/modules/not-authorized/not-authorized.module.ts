import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAuthorizedRoutingModule } from './not-authorized-routing.module';
import { NotAuthorizedComponent } from './page/not-authorized.component';
import { PageTemplateCenterCenterModule } from '@shared/components/templates/page-template-center-center/page-template-center-center.module';

@NgModule({
  declarations: [NotAuthorizedComponent],
  imports: [
    CommonModule,
    NotAuthorizedRoutingModule,
    PageTemplateCenterCenterModule,
  ],
})
export class NotAuthorizedModule {}
