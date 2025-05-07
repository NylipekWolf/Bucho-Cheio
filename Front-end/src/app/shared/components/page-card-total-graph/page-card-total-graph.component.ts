import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-card-total-graph',
  templateUrl: './page-card-total-graph.component.html',
  styleUrl: './page-card-total-graph.component.scss',
})
export class PageCardTotalGraphComponent {
  @Input() text = 'Your text here';
  @Input() value!: number;
  @Input() graphColor = 'grey';
}
