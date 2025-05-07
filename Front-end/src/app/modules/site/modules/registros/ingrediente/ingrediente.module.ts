import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredienteRoutingModule } from './ingrediente-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { IngredienteFormComponent } from './components/ingrediente-form/ingrediente-form.component';
import { PageTemplateCardSaveModule } from '@shared/components/templates/page-template-card-save/page-template-card-save.module';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { IngredienteFilterComponent } from './components/ingrediente-filter/ingrediente-filter.component';
import { ActivateTemplateModule } from '@shared/components/templates/activate-template/activate-template.module';
import { IngredienteService } from './services/ingrediente.service';
import { IngredienteComponent } from './page/ingrediente.component';
import { ButtonOverlayTemplateModule } from '../../../../../shared/components/templates/button-overlay-template/button-overlay-template.module';

@NgModule({
  declarations: [
    IngredienteComponent,
    IngredienteFilterComponent,
    IngredienteFormComponent,
  ],
  imports: [
    CommonModule,
    IngredienteRoutingModule,
    PageTemplateMainModule,
    PageTemplateCardModule,
    PageTemplateCardSaveModule,
    TableTemplateModule,
    ButtonModule,
    PageFullTemplateModule,
    FormTemplateModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FilterTemplateModule,
    ActivateTemplateModule,
    ButtonOverlayTemplateModule,
  ],
  providers: [IngredienteService],
})
export class IngredienteModule {}
