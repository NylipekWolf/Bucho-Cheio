import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

@Component({
  selector: 'compras-filter',
  templateUrl: './compras-filter.component.html',
  styleUrl: './compras-filter.component.scss',
})
export class ComprasFilterComponent {
  @Input() form!: FormGroup;
  @Input() options: KeyValueItem[] = [];
}
