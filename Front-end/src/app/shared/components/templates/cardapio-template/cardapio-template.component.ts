import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'cardapio-template',
  templateUrl: './cardapio-template.component.html',
  styleUrl: './cardapio-template.component.scss',
})
export class CardapioTemplateComponent implements OnInit {
  @Input() cardapio: any[] = [];
  layout: 'list' | 'grid' = 'list';
  ngOnInit(): void {
    this.cardapio = [
      {
        categoria: 'Entradas',
        items: [
          {
            nome: 'Cachorro quente',
            image:
              'https://cdn.pixabay.com/photo/2021/02/15/11/43/hot-dog-6017568_640.jpg',
            preco: 10,
            descricao: 'Uma pão de hotdog com salsicha',
            quantidade: 0,
          },
        ],
      },
      {
        categoria: 'Sobremesas',
        items: [
          {
            nome: 'Tiramisú',
            image:
              'https://cdn.pixabay.com/photo/2017/10/28/19/07/tiramisu-2897900_640.jpg',
            preco: 123,
            descricao: 'Um PAVÊ italiano',
            quantidade: 0,
          },
          {
            nome: 'Sorvete',
            image:
              'https://cdn.pixabay.com/photo/2018/05/10/22/42/ice-cream-3389010_1280.jpg',
            preco: 20,
            descricao:
              'Um sorvete muito delicioso, nas opções de chocolate, baunilha e morango. Com adicional de cauda',
            quantidade: 0,
          },
          {
            nome: 'Brigadeiro',
            image:
              'https://cdn.pixabay.com/photo/2021/09/04/05/06/brigadier-6597018_640.jpg',
            preco: 5,
            descricao: 'Um otimo brigadeiro caseiro, 5 reais cada um ',
            quantidade: 0,
          },
        ],
      },
    ];
  }

  adicionar(item: any): void {
    item.quantidade += 1;
  }
  remover(item: any): void {
    if (item.quantidade > 0) item.quantidade -= 1;
  }
}
