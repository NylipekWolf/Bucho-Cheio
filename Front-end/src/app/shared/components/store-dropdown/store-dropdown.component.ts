import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StoreDropDownItem } from './interfaces/store-dropdown-item.interface';

@Component({
  selector: 'app-store-dropdown',
  templateUrl: './store-dropdown.component.html',
  styleUrl: './store-dropdown.component.scss',
})
export class StoreDropdownComponent {
  @Input() stores!: StoreDropDownItem[];
  @Input() storeSelected!: StoreDropDownItem;
  @Output() changeOutput = new EventEmitter<StoreDropDownItem>();

  public onChange($event: StoreDropDownItem): void {
    this.changeOutput.emit($event);
  }

  public getDescription(descr: string): string[] {
    let descrArr: string[];
    if (descr.includes('|')) {
      descrArr = descr.split('|');
    } else {
      descrArr = [descr];
    }
    return descrArr;
  }
}
