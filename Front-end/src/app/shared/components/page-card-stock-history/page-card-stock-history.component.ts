import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListTemplateItem } from '../templates/list-template/interfaces/list-template-item.interface';

@Component({
  selector: 'app-page-card-stock-history',
  templateUrl: './page-card-stock-history.component.html',
  styleUrl: './page-card-stock-history.component.scss',
})
export class PageCardStockHistoryComponent {
  @Input() list!: ListTemplateItem[];
  @Output() onLoadMore = new EventEmitter<any>();
  loadMore(): void {
    this.onLoadMore.emit();
  }
}
