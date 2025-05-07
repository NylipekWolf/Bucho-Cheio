import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'menu-template',
  templateUrl: './menu-template.component.html',
  styleUrl: './menu-template.component.scss',
})
export class MenuTemplateComponent implements OnInit {
  @Input() menuItem: MenuItem[] = [];
  @Input() userInfo: { userName: string; userCargo: string } = {
    userName: 'Kepilyn Vinicios',
    userCargo: 'Gerente',
  };
  ngOnInit(): void {
    this.menuItem = [
      {
        label: 'Registro',
        items: [
          { label: 'Ingrediente', routerLink: 'registrar-ingrediente' },
          { label: 'Mesa', routerLink: 'registrar-mesa' },
          { label: 'Cardapio', routerLink: 'registrar-cardapio' },
          { label: 'Fornecedor', routerLink: 'registrar-fornecedor' },
          { label: 'Compras', routerLink: 'registrar-compras' },
        ],
      },
      {
        label: 'Operacional',
        items: [
          { label: 'Mesa', routerLink: 'mesa' },
          { label: 'Home', routerLink: 'home' },
        ],
      },
      {
        label: 'Configurações',
        items: [
          {
            label: 'Usuario',
            routerLink: 'usuario',
          },
          { label: 'Perfil', routerLink: 'perfil' },
        ],
      },
    ];
  }
  public getInicials(name: string): string {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }
}
