import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NobodyHereComponent } from './nobody-here.component';

@NgModule({
  declarations: [NobodyHereComponent],
  imports: [CommonModule],
  exports: [NobodyHereComponent],
})
export class NobodyHereModule {}
