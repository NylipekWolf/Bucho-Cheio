import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsProfileRoutingModule } from './settings-profile-routing.module';
import { SettingsProfileComponent } from './page/settings-profile.component';
import { SettingsProfileFormComponent } from './components/settings-profile-form/settings-profile-form.component';
import { SettingsProfileFilterComponent } from './components/settings-profile-filter/settings-profile-filter.component';
import { PageTemplateMainModule } from '@shared/components/templates/page-template-main/page-template-main.module';
import { PageTemplateCardModule } from '@shared/components/templates/page-template-card/page-template-card.module';
import { PageTemplateCardSaveModule } from '@shared/components/templates/page-template-card-save/page-template-card-save.module';
import { TableTemplateModule } from '@shared/components/templates/table-template/table-template.module';
import { ButtonModule } from 'primeng/button';
import { PageFullTemplateModule } from '@shared/components/templates/page-full-template/page-full-template.module';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterTemplateModule } from '@shared/components/templates/filter-template/filter-template.module';
import { ActivateTemplateModule } from '@shared/components/templates/activate-template/activate-template.module';
import { TreeModule } from 'primeng/tree';
import { ProfileService } from './services/profile.service';
import { FunctionalityService } from './services/functionalities.service';

@NgModule({
  declarations: [
    SettingsProfileComponent,
    SettingsProfileFormComponent,
    SettingsProfileFilterComponent,
  ],
  imports: [
    CommonModule,
    SettingsProfileRoutingModule,
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
    TreeModule,
  ],
  providers: [ProfileService, FunctionalityService],
})
export class SettingsProfileModule {}
