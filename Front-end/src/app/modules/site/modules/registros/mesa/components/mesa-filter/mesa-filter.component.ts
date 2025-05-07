import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';

@Component({
  selector: 'mesa-filter',
  templateUrl: './mesa-filter.component.html',
  styleUrl: './mesa-filter.component.scss',
})
export class MesaFilterComponent {
  @Input() form!: FormGroup;
  @Input() options: KeyValueItem[] = [];
}
