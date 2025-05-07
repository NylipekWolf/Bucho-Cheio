import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { StoreDropdownComponent } from './store-dropdown.component';

@NgModule({
  declarations: [StoreDropdownComponent],
  imports: [CommonModule, FormsModule, DropdownModule],
  exports: [StoreDropdownComponent],
})
export class StoreDropdownModule {}
