import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public dados = {};
  ngOnInit(): void {
    this.dados = {
      labels: [
        'Hambúrguer maionese ',
        'Hambúrguer frango',
        'Latinha de coca',
        'batata frita',
        'Yakisoba',
        'sushi',
        'Cachorro quente',
        'Hambúrguer do MC donald',
        'frango frito',
        'strognoff',
      ],
      datasets: [
        {
          label: 'Sales',
          data: [5, 10, 1, 3, 4, 6, 7, 8, 9, 0],
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgb(255, 99, 132)'],
          borderWidth: 1,
        },
      ],
    };
  }
}
