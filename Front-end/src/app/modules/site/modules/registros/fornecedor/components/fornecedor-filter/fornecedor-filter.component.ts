import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

@Component({
  selector: 'fornecedor-filter',
  templateUrl: './fornecedor-filter.component.html',
  styleUrl: './fornecedor-filter.component.scss',
})
export class FornecedorFilterComponent {
  @Input() form!: FormGroup;
  @Input() options: KeyValueItem[] = [];
}
