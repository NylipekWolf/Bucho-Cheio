import { Component } from '@angular/core';
import { ListTemplateItem } from '../templates/list-template/interfaces/list-template-item.interface';

@Component({
  selector: 'app-page-card-labor-history',
  templateUrl: './page-card-labor-history.component.html',
  styleUrl: './page-card-labor-history.component.scss',
})
export class PageCardLaborHistoryComponent {
  list: ListTemplateItem[] = [
    {
      text: 'Rafael edited hourly rate',
      value: 'from $15.99 to $10.99',
      hash: '',
    },
    {
      text: 'Rafael edited sale price',
      value: 'from $5.99 to $6.99',
      hash: '',
    },
    {
      text: 'Rafael edited cost price',
      value: 'from $4.99 to $3.99',
      hash: '',
    },
    {
      text: 'Rafael edited sales tax',
      value: 'from 1% to 2%',
      hash: '',
    },
  ];
}
