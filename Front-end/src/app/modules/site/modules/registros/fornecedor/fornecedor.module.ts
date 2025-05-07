import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form.component';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { FornecedorFilterComponent } from './components/fornecedor-filter/fornecedor-filter.component';
import { FornecedorService } from './services/fornecedor.service';
import { FornecedorComponent } from './page/fornecedor.component';
import { ButtonOverlayTemplateModule } from '../../../../../shared/components/templates/button-overlay-template/button-overlay-template.module';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    FornecedorComponent,
    FornecedorFilterComponent,
    FornecedorFormComponent,
  ],
  imports: [
    ButtonModule,
    ButtonOverlayTemplateModule,
    CalendarModule,
    CheckboxModule,
    CommonModule,
    FornecedorRoutingModule,
    DropdownModule,
    FilterTemplateModule,
    FormTemplateModule,
    InputTextModule,
    InputMaskModule,
    PageFullTemplateModule,
    PageTemplateCardModule,
    PageTemplateMainModule,
    ReactiveFormsModule,
    TableModule,
    TableTemplateModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FornecedorService],
})
export class FornecedorModule {}
