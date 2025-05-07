import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableTemplateColumn } from './interfaces/table-template-column.interface';
import { TableTemplateEnum } from './enums/table-template.enum';
import { DatePipe, formatDate, KeyValue } from '@angular/common';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrl: './table-template.component.scss',
})
export class TableTemplateComponent {
  @Input() dataKey = 'id';
  @Input() items: any[] = [];
  @Input() itemsA: any[] = [];
  @Input() cols: TableTemplateColumn[] = [];
  @Input() loading = false;
  @Output() lineClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() loadMoreClicked: EventEmitter<void> = new EventEmitter<void>();

  itemSelected!: any;
  constructor(private readonly _datePipe: DatePipe) {}

  onRowSelect(event: any): void {
    this.lineClicked.emit(event.data);
  }

  onRowUnselect(): void {
    this.lineClicked.emit(undefined);
  }

  onClickLoadMore(): void {
    this.loadMoreClicked.emit();
  }

  getFormattedField(keyField: any, valueField: any): any {
    const tableTemplateType = this.getFieldType(keyField);

    let field;

    if (valueField !== undefined && valueField !== '') {
      switch (tableTemplateType) {
        case TableTemplateEnum.BOOLEAN:
          field = valueField ? 'Yes' : 'No';
          break;
        default:
          if (valueField.length == 24 && valueField.endsWith('Z')) {
            return this._datePipe.transform(valueField, 'shortDate');
          }
          field = valueField;
          break;
      }
    } else {
      field = '-';
    }
    return field;
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  getFieldType(keyField: any) {
    return this.cols.find((item) => item.field === keyField)
      ?.type as TableTemplateEnum;
  }
}
