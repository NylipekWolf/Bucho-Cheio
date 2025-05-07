import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCardSalesItemsComponent } from './page-card-sales-items.component';
import { PageTemplateCardModule } from '../templates/page-template-card/page-template-card.module';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormTemplateModule } from '../templates/form-template/form-template.module';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonPlusItemComponent } from './components/button-plus-item/button-plus-item.component';
import { ButtonOverlayTemplateModule } from '../templates/button-overlay-template/button-overlay-template.module';
import { ListTemplateModule } from '../templates/list-template/list-template.module';
import { DropdownModule } from 'primeng/dropdown';
import { KitProductComponent } from './components/kit-product/kit-product.component';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    PageCardSalesItemsComponent,
    KitProductComponent,
    ButtonPlusItemComponent,
  ],
  imports: [
    AutoCompleteModule,
    ButtonModule,
    ButtonOverlayTemplateModule,
    CheckboxModule,
    CommonModule,
    DividerModule,
    DropdownModule,
    FormsModule,
    FormTemplateModule,
    InputTextModule,
    InputNumberModule,
    ListTemplateModule,
    PageTemplateCardModule,
    ReactiveFormsModule,
  ],
  exports: [PageCardSalesItemsComponent],
})
export class PageCardSalesItemsModule {}
