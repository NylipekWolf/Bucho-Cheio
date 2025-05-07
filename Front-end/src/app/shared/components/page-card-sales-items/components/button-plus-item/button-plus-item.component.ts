import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-plus-item',
  templateUrl: './button-plus-item.component.html',
  styleUrl: './button-plus-item.component.scss',
})
export class ButtonPlusItemComponent {
  @Input() currentValue = 1;
  @Output() minusEvent = new EventEmitter<void>();
  @Output() plusEvent = new EventEmitter<void>();

  minus(): void {
    if (this.currentValue === 1) {
      return;
    }
    this.currentValue--;
    this.minusEvent.emit();
  }

  plus(): void {
    this.currentValue++;
    this.plusEvent.emit();
  }
}
