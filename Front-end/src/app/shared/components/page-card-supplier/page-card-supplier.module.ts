import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCardSupplierComponent } from './page-card-supplier.component';
import { PageTemplateCardModule } from '../templates/page-template-card/page-template-card.module';
import { ButtonModule } from 'primeng/button';
import { FormTemplateModule } from '../templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ListTemplateModule } from '../templates/list-template/list-template.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [PageCardSupplierComponent],
  imports: [
    CommonModule,
    PageTemplateCardModule,
    ButtonModule,
    FormTemplateModule,
    InputTextModule,
    ListTemplateModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  exports: [PageCardSupplierComponent],
})
export class PageCardSupplierModule {}
