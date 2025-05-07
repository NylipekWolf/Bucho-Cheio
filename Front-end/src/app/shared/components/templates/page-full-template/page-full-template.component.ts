import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-full-template',
  templateUrl: './page-full-template.component.html',
  styleUrl: './page-full-template.component.scss',
})
export class PageFullTemplateComponent {
  @Input() showPage = false;
}
