import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, AvatarModule, MenuModule, ButtonModule],
  exports: [UserInfoComponent],
})
export class UserInfoModule {}
