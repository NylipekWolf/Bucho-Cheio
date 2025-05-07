import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  @Input() accept = '.png, .jpg, .jpeg';
  @Input() labelText = 'Choose a file';
  @Input() fileText = 'No file chosen';
  @Output() onChange = new EventEmitter<File>();

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.labelText = 'Replace file';
      this.fileText = file.name;
      this.onChange.emit(file);
    }
  }
}
