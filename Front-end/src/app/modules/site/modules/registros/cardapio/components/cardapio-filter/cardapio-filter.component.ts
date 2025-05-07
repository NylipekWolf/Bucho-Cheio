import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

@Component({
  selector: 'cardapio-filter',
  templateUrl: './cardapio-filter.component.html',
  styleUrl: './cardapio-filter.component.scss',
})
export class CardapioFilterComponent {
  @Input() form!: FormGroup;
  @Input() options: KeyValueItem[] = [];
}
