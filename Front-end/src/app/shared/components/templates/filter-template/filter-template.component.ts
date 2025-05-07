import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-template',
  templateUrl: './filter-template.component.html',
  styleUrl: './filter-template.component.scss',
})
export class FilterTemplateComponent {
  @Input() subtitle = 'Filter registered items';
  @Input() customStyle!: string;
  @Output() onApply = new EventEmitter<any>();
  @Output() onReset = new EventEmitter<void>();

  apply(): void {
    this.onApply.emit();
  }

  reset(): void {
    this.onReset.emit();
  }
}
