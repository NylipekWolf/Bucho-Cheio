import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { MesaRoutingModule } from './mesa-routing.module';
import { MesaComponent } from './page/mesa.component';
import { MesaFilterComponent } from './components/mesa-filter/mesa-filter.component';
import { ListMesaComponent } from './components/list-mesa/list-mesa.component';
import { MesaService } from '../../registros/mesa/services/mesa.service';
import { ComandaService } from '../../../../../services/comanda.service';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { CriarComandaComponent } from './components/criar-comanda/criar-comanda.component';
import { PageTemplateCardSaveModule } from '@shared/components/templates/page-template-card-save/page-template-card-save.module';
import { CardapioTemplateModule } from '@shared/components/templates/cardapio-template/cardapio-template.module';

@NgModule({
  declarations: [
    MesaComponent,
    MesaFilterComponent,
    ListMesaComponent,
    CriarComandaComponent,
  ],
  imports: [
    ButtonModule,
    CardapioTemplateModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    FilterTemplateModule,
    InputTextModule,
    MesaRoutingModule,
    PageTemplateCardModule,
    PageFullTemplateModule,
    PageTemplateCardSaveModule,
    PageTemplateMainModule,
    ReactiveFormsModule,
    TableTemplateModule,
  ],
  providers: [MesaService, ComandaService],
})
export class MesaModule {}
