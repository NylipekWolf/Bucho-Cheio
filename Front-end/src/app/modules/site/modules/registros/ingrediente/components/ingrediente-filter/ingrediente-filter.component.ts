import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

@Component({
  selector: 'ingrediente-filter',
  templateUrl: './ingrediente-filter.component.html',
  styleUrl: './ingrediente-filter.component.scss',
})
export class IngredienteFilterComponent {
  @Input() form!: FormGroup;
  @Input() options: KeyValueItem[] = [];
}
