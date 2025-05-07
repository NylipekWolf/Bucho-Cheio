import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MesaService } from '@modules/site/modules/registros/mesa/services/mesa.service';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { ComandaService } from '../../../../../../../services/comanda.service';
import { Subject, takeUntil } from 'rxjs';
import { ComandaResponse } from '../../../../../../../services/responses/comanda-response.interface';
import { MesaResponse } from '@modules/site/modules/registros/mesa/services/responses/mesa-response.interface';

@Component({
  selector: 'list-mesa',
  templateUrl: './list-mesa.component.html',
  styleUrl: './list-mesa.component.scss',
})
export class ListMesaComponent implements OnInit, OnDestroy {
  dados: any[] = [];
  mesaSelecionada!: MesaResponse;
  modalVisible = false;
  showPage = true;
  subtitle = '';
  comandas: ComandaResponse[] = [];
  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _mesaService: MesaService,
    private readonly _comandaService: ComandaService
  ) {}

  ngOnInit(): void {
    for (let index = 0; index <= 10; index++) {
      this.dados.push({
        id: index + 1,
        status: this.gerarStatus(),
        quantidade: Math.floor(Math.random() * 6) + 1,
      });
    }
  }

  gerarStatus(): string {
    const numero = Math.floor(Math.random() * 4) + 1;

    if (numero === 1) return '#BB5050';
    else if (numero === 2) return '#73B360';
    else return '#808080';
  }
  criarComanda(): void {
    this.showPage = true;
  }
  buscar(mesa: MesaResponse): void {
    this.mesaSelecionada = mesa;
    console.log(this.mesaSelecionada);
    this.buscarComanda(mesa.id);
  }
  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
  private buscarComanda(idMesa: number) {
    this._comandaService
      .buscarComanda(idMesa)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res) => {
          this.subtitle = 'Lista todas as comandas da mesa:' + idMesa;
          this.comandas = res;
        },
        error: () => {},
        complete: () => {
          this.modalVisible = true;
        },
      });
  }
}
