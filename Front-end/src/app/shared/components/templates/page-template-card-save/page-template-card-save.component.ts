import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-page-template-card-save',
  templateUrl: './page-template-card-save.component.html',
})
export class PageTemplateCardSaveComponent {
  @Input() title = 'Put your title here';
  @Input() subtitle = 'Put your subtitle here';
  @Input() primeIcon: PrimeIcons = PrimeIcons.BELL;
  @Input() customButtons = false;
  @Input() disabled = false;
  @Input() badge = '';
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
