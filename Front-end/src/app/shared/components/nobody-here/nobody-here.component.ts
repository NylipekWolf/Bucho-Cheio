import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nobody-here',
  templateUrl: './nobody-here.component.html',
  styleUrl: './nobody-here.component.scss',
})
export class NobodyHereComponent {
  @Input() imageStyle!: string;
  @Input() text = 'Nada por aqui';
  @Input() description =
    'Infelizmente não encontramos nenhuma informação com esses dados, tente com outros';
  @Input() loading = false;
}
