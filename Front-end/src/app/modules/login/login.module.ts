import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './page/login.component';
import { PageTemplateCenterCenterModule } from '@shared/components/templates/page-template-center-center/page-template-center-center.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormTemplateModule } from '@shared/components/templates/form-template/form-template.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    PageTemplateCenterCenterModule,
    FormTemplateModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
