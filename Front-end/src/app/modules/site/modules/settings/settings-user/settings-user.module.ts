import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsUserRoutingModule } from './settings-user-routing.module';
import { SettingsUserComponent } from './page/settings-user.component';
import { SettingsUserFilterComponent } from './components/settings-user-filter/settings-user-filter.component';
import { SettingsUserFormComponent } from './components/settings-user-form/settings-user-form.component';
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
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { SettingsUserProfileComponent } from './components/settings-user-profile/settings-user-profile.component';
import { ListTemplateModule } from '@shared/components/templates/list-template/list-template.module';
import { SettingsUserService } from './services/settings-user.service';
import { ProfileService } from '../settings-profile/services/profile.service';

@NgModule({
  declarations: [
    SettingsUserComponent,
    SettingsUserFilterComponent,
    SettingsUserFormComponent,
    SettingsUserProfileComponent,
  ],
  imports: [
    CommonModule,
    SettingsUserRoutingModule,
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
    DividerModule,
    PasswordModule,
    ListTemplateModule,
  ],
  providers: [SettingsUserService, ProfileService],
})
export class SettingsUserModule {}
