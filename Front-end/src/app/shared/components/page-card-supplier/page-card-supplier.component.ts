import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListTemplateItem } from '../templates/list-template/interfaces/list-template-item.interface';
import { FormUtils } from '@shared/utils/form.utils';
import { MessageService } from 'primeng/api';
import {
  itemHasBeenAdded,
  itemMustBeSelected,
} from '@shared/utils/message.utils';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CommonSupplierResponse } from '../../../services/responses/common-suppliers-response.interface';

@Component({
  selector: 'app-page-card-supplier',
  templateUrl: './page-card-supplier.component.html',
  styleUrl: './page-card-supplier.component.scss',
})
export class PageCardSupplierComponent implements OnInit {
  @Input() suppliers: CommonSupplierResponse[] = [];
  @Input() suppliersSelected: CommonSupplierResponse[] = [];
  @Input() loading = false;
  @Output() suppliersOutput = new EventEmitter<CommonSupplierResponse[]>();
  form!: FormGroup;
  listTemplateItem: ListTemplateItem[] = [];
  formUtils!: FormUtils;
  supplierSuggestions: CommonSupplierResponse[] = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      supplier: [null, Validators.required],
    });
    this.formUtils = new FormUtils(this.form);

    if (this.suppliersSelected) {
      this.listTemplateItem = this.suppliersSelected.map((p) => {
        return this.createListTemplateItem(p);
      });
    }
  }

  addItem(): void {
    if (this.form.invalid) {
      return;
    }

    const supplierValue = this.form.get('supplier')?.value;

    if (typeof supplierValue === 'string') {
      itemMustBeSelected(this._messageService);
      return;
    }

    const item = this.createListTemplateItem(supplierValue);

    var hasItem = this.listTemplateItem.find((i) => i.hash === item.hash);

    if (hasItem) {
      itemHasBeenAdded(this._messageService);
      return;
    }

    this.listTemplateItem.push(item);
    this.updateSuppliers();
    this.form.reset();
  }

  delItem(index: any): void {
    this.listTemplateItem.splice(index, 1);
    this.updateSuppliers();
  }

  filterSuppliers($event: AutoCompleteCompleteEvent): void {
    let query = $event.query;
    this.supplierSuggestions = this.suppliers.filter((m) =>
      m.supplierName.toLowerCase().includes(query.toLowerCase())
    );
  }

  private updateSuppliers(): void {
    const suppliers = this.listTemplateItem.map(
      (t) => t.item as CommonSupplierResponse
    );
    this.suppliersOutput.emit(suppliers);
  }

  private createListTemplateItem(supplierValue: any): ListTemplateItem {
    const supplier = supplierValue as CommonSupplierResponse;

    const item: ListTemplateItem = {
      text: supplier.supplierName,
      value: '',
      item: supplier,
      hash: `${supplier.supplierName}`,
    };
    return item;
  }
}
