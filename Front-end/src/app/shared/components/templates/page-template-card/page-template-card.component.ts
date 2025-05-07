import { Component, Input } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-page-template-card',
  templateUrl: './page-template-card.component.html',
  styleUrl: './page-template-card.component.scss',
})
export class PageTemplateCardComponent {
  @Input() title = 'Put your title here';
  @Input() subtitle = 'Put your subtitle here';
  @Input() primeIcon: PrimeIcons = PrimeIcons.BELL;
  @Input() noTitle = false;
}
