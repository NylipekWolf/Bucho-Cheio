import { Component, OnDestroy, OnInit } from '@angular/core';
import { showWarningMessage } from '../../../../../../utils/message.utils';
import { Subject, takeUntil } from 'rxjs';
import { IngredienteFilter } from '../services/filters/ingrediente-filter.interface';
import { IngredienteResponse } from '../services/responses/ingrediente-response.interface';
import { AppModel } from '../../../../../../ngrx/app.models';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IngredienteService } from '../services/ingrediente.service';
import { MessageService } from 'primeng/api';
import { TableTemplateEnum } from '@shared/components/templates/table-template/enums/table-template.enum';
import { TableTemplateColumn } from '@shared/components/templates/table-template/interfaces/table-template-column.interface';

@Component({
  templateUrl: './ingrediente.component.html',
  styleUrl: './ingrediente.component.scss',
})
export class IngredienteComponent implements OnInit, OnDestroy {
  openForm = false;
  editCustomer = false;
  loading = false;
  formSearch!: FormGroup;
  currentPage = 1;
  defaultPageSize = 10;

  customerCols: TableTemplateColumn[] = [
    { field: 'id', header: 'Id ingrediente' },
    { field: 'nome', header: 'Nome' },
    { field: 'quantidade', header: 'Quantidade' },
    { field: 'validade', header: 'Validade' },
    { field: 'preco', header: 'Preço', type: TableTemplateEnum.CURRENCY },
    { field: 'fornecedor', header: 'Fornecedor' },
  ];

  tableItems: IngredienteResponse[] = [];
  storeName!: string;

  private authorizedButtons: number[] = [];
  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _messageService: MessageService,
    private readonly _service: IngredienteService,
    private readonly _formBuider: FormBuilder,
    private readonly _store: Store
  ) {}

  ngOnInit(): void {
    this.formSearch = this._formBuider.group({
      id: [''],
      nome: [''],
      fornecedor: [''],
      validade: [''],
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

  loadMore(): void {}

  aplicarFiltros(): void {
    this.search();
  }

  resetFilter(): void {
    this.formSearch.reset();
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

  private search(filter?: IngredienteFilter, moreItems?: boolean) {
    this.loading = true;
    this._service
      .search(filter)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: IngredienteResponse[]) => {
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
