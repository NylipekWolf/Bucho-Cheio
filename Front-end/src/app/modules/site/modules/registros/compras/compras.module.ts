import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { ComprasFormComponent } from './components/compras-form/compras-form.component';
import { PageTemplateCardSaveModule } from '@shared/components/templates/page-template-card-save/page-template-card-save.module';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { ComprasFilterComponent } from './components/compras-filter/compras-filter.component';
import { ActivateTemplateModule } from '@shared/components/templates/activate-template/activate-template.module';
import { ComprasService } from './services/compras.service';
import { ComprasComponent } from './page/compras.component';
import { ButtonOverlayTemplateModule } from '../../../../../shared/components/templates/button-overlay-template/button-overlay-template.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ComprasComponent,
    ComprasFilterComponent,
    ComprasFormComponent,
  ],
  imports: [
    ButtonModule,
    ButtonOverlayTemplateModule,
    CalendarModule,
    CommonModule,
    ComprasRoutingModule,
    DropdownModule,
    FilterTemplateModule,
    FormTemplateModule,
    InputTextModule,
    PageFullTemplateModule,
    PageTemplateCardModule,
    PageTemplateMainModule,
    ReactiveFormsModule,
    TableTemplateModule,
  ],
  providers: [ComprasService],
})
export class ComprasModule {}
