import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-activate-template',
  templateUrl: './activate-template.component.html',
  styleUrl: './activate-template.component.scss',
})
export class ActivateTemplateComponent {
  @Input() activated!: boolean;
  @Output() onProceed = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  proceed(): void {
    this.onProceed.emit();
  }

  cancel(): void {
    this.onCancel.emit();
  }
}
