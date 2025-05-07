import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-template-main',
  templateUrl: './page-template-main.component.html',
  styleUrl: './page-template-main.component.scss',
})
export class PageTemplateMainComponent {
  @Input() title = 'Coloque o seu titulo aqui';
  @Input() subtitle = 'Coloque o seu sub-titulo aqui';
  @Input() breadcrumb: MenuItem[] | undefined;
  @Input() breadcrumbHome: MenuItem | undefined;
}
