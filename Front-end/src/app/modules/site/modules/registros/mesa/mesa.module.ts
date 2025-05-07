import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MesaRoutingModule } from './mesa-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { MesaFormComponent } from './components/mesa-form/mesa-form.component';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { MesaFilterComponent } from './components/mesa-filter/mesa-filter.component';
import { MesaService } from './services/mesa.service';
import { MesaComponent } from './page/mesa.component';
import { ButtonOverlayTemplateModule } from '../../../../../shared/components/templates/button-overlay-template/button-overlay-template.module';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [MesaComponent, MesaFilterComponent, MesaFormComponent],
  imports: [
    ButtonModule,
    ButtonOverlayTemplateModule,
    CalendarModule,
    CommonModule,
    MesaRoutingModule,
    DropdownModule,
    FilterTemplateModule,
    FormTemplateModule,
    InputTextModule,
    InputNumberModule,
    PageFullTemplateModule,
    PageTemplateCardModule,
    PageTemplateMainModule,
    ReactiveFormsModule,
    TableTemplateModule,
  ],
  providers: [MesaService],
})
export class MesaModule {}
