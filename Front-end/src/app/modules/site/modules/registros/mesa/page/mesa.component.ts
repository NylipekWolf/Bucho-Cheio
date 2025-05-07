import { TableTemplateColumn } from '../../../../../../shared/components/templates/table-template/interfaces/table-template-column.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { MesaService } from '../services/mesa.service';
import { MesaFilter } from '../services/filters/mesa-filter.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { showWarningMessage } from '../../../../../../utils/message.utils';
import { Store } from '@ngrx/store';
import { AppModel } from '../../../../../../ngrx/app.models';
import { MesaResponse } from '../services/responses/mesa-response.interface';
import { TableTemplateEnum } from '@shared/components/templates/table-template/enums/table-template.enum';

@Component({
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.scss',
})
export class MesaComponent implements OnInit, OnDestroy {
  openForm = false;
  editCustomer = false;
  loading = false;
  formSearch!: FormGroup;
  currentPage = 1;
  defaultPageSize = 10;
  mesaSelecionada!: MesaResponse;

  customerCols: TableTemplateColumn[] = [
    { field: 'id', header: 'Id da mesa' },
    { field: 'status', header: 'Status' },
    { field: 'quantidade', header: 'Quantidade de lugares' },
    { field: 'comanda', header: 'Comanda', type: TableTemplateEnum.HIDE },
  ];

  tableItems: MesaResponse[] = [];
  storeName!: string;

  private authorizedButtons: number[] = [];
  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _messageService: MessageService,
    private readonly _service: MesaService,
    private readonly _formBuider: FormBuilder,
    private readonly _store: Store
  ) {}

  ngOnInit(): void {
    this.formSearch = this._formBuider.group({
      id: [''],
      quantidade: [1],
    });
    this._store
      .select((state: any) => state.appModel)
      .pipe(takeUntil(this._unsub$))
      .subscribe((data: AppModel) => {
        this.authorizedButtons = data.profileSelected.authorizedButtons;
        this.storeName = `Store ${data.profileSelected.store.name}`;
      });
    this.search();
  }

  receiveItem(item: MesaResponse) {
    if (this.mesaSelecionada && item.id === this.mesaSelecionada.id)
      this.mesaSelecionada.quantidade_de_lugares = item.quantidade_de_lugares;
    else this.tableItems.push(item);
  }

  selecionarMesa(mesa: MesaResponse) {
    this.mesaSelecionada = mesa;
  }
  loadMore(): void {}

  aplicarFiltros(): void {
    const query: MesaFilter = {};
    if (this.formSearch.get('id')?.value)
      query.id = this.formSearch.get('id')?.value;
    if (this.formSearch.get('quantidade')?.value)
      query.quantidade_de_lugares = this.formSearch.get('quantidade')?.value;
    this.search(query);
  }

  resetFilter(): void {
    this.formSearch.reset();
    this.formSearch.get('quantidade')?.setValue(1);
    this.search();
  }

  get newCustomerButton(): boolean {
    return this.hasAuthorizedButton(53);
  }
  get editCustomerButton(): boolean {
    return this.hasAuthorizedButton(54);
  }
  get activeCustomerButton(): boolean {
    return this.hasAuthorizedButton(55);
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private search(filter?: MesaFilter, moreItems?: boolean) {
    this.loading = true;
    this._service
      .search(filter)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: MesaResponse[]) => {
          const tableRes = res.map((item) => {
            return item;
          });
          if (moreItems) {
            if (res.length > 0) {
              this.tableItems = this.tableItems.concat(tableRes);
            } else {
              showWarningMessage(
                this._messageService,
                `There's no more items to load`
              );
              this.currentPage--;
            }
          } else {
            this.tableItems = tableRes;
          }
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  private hasAuthorizedButton(id: number): boolean {
    return this.authorizedButtons.includes(id);
  }
}
