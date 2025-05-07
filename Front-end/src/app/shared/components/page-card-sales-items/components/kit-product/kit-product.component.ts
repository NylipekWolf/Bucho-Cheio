import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { SalesItem } from '../../interfaces/sale-item.interface';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';

@Component({
  selector: 'app-kit-product',
  templateUrl: './kit-product.component.html',
  styleUrl: './kit-product.component.scss',
})
export class KitProductComponent implements OnInit {
  @Output() closeOutput = new EventEmitter<any>();
  @Input() optionProducts: any[] = [];
  form!: FormGroup;
  total = 0;
  salesItems: SalesItem[] = [];
  itemsSuggestions: any[] = [];

  formUtils!: FormUtils;
  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      kitName: [null, Validators.required],
      salesPrice: [null, Validators.required],
      product: [''],
    });
    this.formUtils = new FormUtils(this.form);
  }

  addItem(): void {
    const product = this.form.get('product')?.value;
    const item: SalesItem = {
      itemId: product.itemId,
      name: product.name,
      costPrice: product.costPrice,
      salePrice: product.salePrice,
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
    this.form.get('product')?.reset();
  }

  plusItem(item: SalesItem): void {
    item.quantity++;
  }

  minusItem(item: SalesItem): void {
    item.quantity--;
  }

  filterItems($event: AutoCompleteCompleteEvent): void {
    let filtered: any[] = [];
    let query = $event.query;
    for (let i = 0; i < (this.optionProducts as any[]).length; i++) {
      let item = (this.optionProducts as any[])[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }

    this.itemsSuggestions = filtered;
  }

  delItem(index: any): void {
    this.salesItems.splice(index, 1);
  }

  save(): void {
    const kit: SalesItem = {
      itemId: null,
      name: this.form.get('kitName')?.value,
      costPrice: 0,
      salePrice: this.form.get('salesPrice')?.value,
      quantity: 1,
      taxable: false,
      kitProducts: this.salesItems.map((item, index) => {
        return {
          productId: item.itemId as number,
          productName: item.name,
          quantity: item.quantity,
          salesProductKitId: index,
        };
      }),
    };
    this.closeOutput.emit(kit);
  }

  onHide(): void {
    this.form.reset();
    this.salesItems = [];
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
  }

  get disabled(): boolean {
    if (this.form.invalid) return true;
    else if (this.salesItems.length > 1) return false;
    else if (this.salesItems.length == 1 && this.salesItems[0].quantity > 1)
      return false;

    return true;
  }
}
