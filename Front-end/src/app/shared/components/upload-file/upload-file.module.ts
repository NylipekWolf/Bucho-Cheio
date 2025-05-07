import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UploadFileComponent],
})
export class UploadFileModule {}
