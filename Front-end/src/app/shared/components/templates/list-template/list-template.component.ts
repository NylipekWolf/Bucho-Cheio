import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListTemplateItem } from './interfaces/list-template-item.interface';

@Component({
  selector: 'app-list-template',
  templateUrl: './list-template.component.html',
  styleUrl: './list-template.component.scss',
})
export class ListTemplateComponent {
  @Input() list: ListTemplateItem[] = [];
  @Input() routerLinkPath!: string;
  @Input() linkPos = 'right';
  @Input() hasButton = false;
  @Input() buttonLabel = 'Remove';
  @Input() hasMore = true;
  @Input() hasPrincipal = false;
  @Input() dasboard = false;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onPrincipal = new EventEmitter<any>();
  @Output() onLoadMore = new EventEmitter<any>();

  loadMore(): void {
    this.onLoadMore.emit();
  }
  deleteItem(index: number): void {
    this.onDelete.emit(index);
  }
  principalItem(index: number): void {
    if (this.hasPrincipal) {
      this.list.forEach((item) => (item.item.principal = false));
      this.list[index].item.principal = true;
      this.onPrincipal.emit(index);
    }
  }
}
