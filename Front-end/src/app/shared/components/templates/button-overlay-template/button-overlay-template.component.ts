import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-overlay-template',
  templateUrl: './button-overlay-template.component.html',
  styleUrl: './button-overlay-template.component.scss',
})
export class ButtonOverlayTemplateComponent {
  @Input() isBlackButton = false;
  @Input() primeIcon = 'pi pi-dashboard';
  @Input() size: 'small' | 'large' | undefined = undefined;
  @Input() buttonLabel = 'Button';
  @Input() subtitle = 'Algum subtitulo aqui';
  @Input() labelProceed = 'Adicionar';
  @Input() labelCancel = 'Reset';
  @Input() badge = '';
  @Input() customStyle!: string;
  @Input() disabled = false;
  @Input() disabledProceed = false;
  @Input() showActionButtons = true;
  @Output() onProceed = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onShow = new EventEmitter<any>();
  @Output() onHide = new EventEmitter<void>();

  proceed(): void {
    this.onProceed.emit();
  }

  show(): void {
    this.onShow.emit();
  }
  hide(): void {
    this.onHide.emit();
  }
  cancel(): void {
    this.onCancel.emit();
  }
}
