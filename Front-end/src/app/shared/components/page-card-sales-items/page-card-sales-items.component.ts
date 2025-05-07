import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { MessageService } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { SalesItem } from './interfaces/sale-item.interface';
import { ListTemplateItem } from '../templates/list-template/interfaces/list-template-item.interface';

@Component({
  selector: 'app-page-card-sales-items',
  templateUrl: './page-card-sales-items.component.html',
  styleUrl: './page-card-sales-items.component.scss',
})
export class PageCardSalesItemsComponent implements OnInit {
  @Output() taxRatOutput = new EventEmitter<any>();
  @Output() subTotalEvent = new EventEmitter<number>();
  @Input() type!: string;
  @Input() optionProducts: SalesItem[] = [];
  @Input() optionServices: SalesItem[] = [];
  @Input() salesItems!: SalesItem[];
  publiclistKitProduct: ListTemplateItem[] = [];

  subtitle = 'Listing';
  label = 'Label';

  form!: FormGroup;
  formUtils!: FormUtils;

  itemsSuggestions: any[] = [];

  quantity!: number;

  total = 0;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      item: ['', Validators.required],
    });
    this.formUtils = new FormUtils(this.form);

    if (this.type === 'PRODUCTS') {
      this.subtitle = 'Stock products';
      this.label = 'Product (search or use barcode reader)';
    } else {
      this.subtitle = 'Labor listing';
      this.label = 'Service (only search)';
    }
    if (this.salesItems.length > 0) this.calculate();
  }

  addItem(): void {
    if (this.form.invalid) {
      return;
    }

    const formItem = this.form.get('item')?.value as any;
    const item: SalesItem = {
      itemId: formItem.itemId,
      name: formItem.name,
      costPrice: formItem.costPrice,
      salePrice: formItem.salePrice,
      quantity: 1,
      taxable: false,
    };

    var hasItem = this.salesItems.find((i) => i.itemId === item.itemId);

    if (hasItem) {
      this.plusItem(hasItem);
    } else {
      this.salesItems.push(item);
      this.calculate();
    }

    this.form.reset();
  }

  delItem(index: any): void {
    this.salesItems.splice(index, 1);
    this.calculate();
  }

  filterItems($event: AutoCompleteCompleteEvent): void {
    let filtered: any[] = [];
    let query = $event.query;
    if (this.type === 'PRODUCTS') {
      for (let i = 0; i < (this.optionProducts as any[]).length; i++) {
        let item = (this.optionProducts as any[])[i];
        if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(item);
        }
      }
    } else {
      for (let i = 0; i < (this.optionServices as any[]).length; i++) {
        let item = (this.optionServices as any[])[i];
        if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(item);
        }
      }
    }
    this.itemsSuggestions = filtered;
  }

  plusItem(item: SalesItem): void {
    item.quantity++;
    this.calculate();
    this.taxable();
  }
  taxable(): void {
    this.taxRatOutput.emit();
  }

  calculate(): void {
    this.total = 0;
    this.salesItems.forEach((item: SalesItem) => {
      if (item.salePrice) {
        const quantity = item.quantity;
        const price = item.salePrice;

        let tempTotal = 0;

        tempTotal = price * quantity;

        this.total = this.total + tempTotal;
      }
    });
    this.subTotalEvent.emit(this.total);
  }
}
