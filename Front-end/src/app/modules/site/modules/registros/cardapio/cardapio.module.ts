import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardapioRoutingModule } from './cardapio-routing.module';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { CardapioFormComponent } from './components/cardapio-form/cardapio-form.component';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { CardapioFilterComponent } from './components/cardapio-filter/cardapio-filter.component';
import { CardapioService } from './services/cardapio.service';
import { CardapioComponent } from './page/cardapio.component';
import { ButtonOverlayTemplateModule } from '../../../../../shared/components/templates/button-overlay-template/button-overlay-template.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    CardapioComponent,
    CardapioFilterComponent,
    CardapioFormComponent,
  ],
  imports: [
    ButtonModule,
    ButtonOverlayTemplateModule,
    CalendarModule,
    CommonModule,
    CardapioRoutingModule,
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
  providers: [CardapioService],
})
export class CardapioModule {}
