import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'criar-comanda',
  templateUrl: './criar-comanda.component.html',
  styleUrls: ['./criar-comanda.component.scss'],
})
export class CriarComandaComponent {
  @Output() closeOutput = new EventEmitter<void>();
  @Input() showPage = false;
  menu: string[] = [
    'Menu',
    'Entradas',
    'Saladas',
    'Hambúrguers',
    'Carnes',
    'Frangos',
    'Sobremesas',
    'Bebidas',
  ];
  title = 'Cardapio';
  subtitle = '';

  save(): void {}

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
