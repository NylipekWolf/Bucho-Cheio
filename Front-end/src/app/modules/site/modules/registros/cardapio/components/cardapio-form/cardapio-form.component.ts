import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { MenuItem, MessageService } from 'primeng/api';
import { CardapioService } from '../../services/cardapio.service';
import { Subject, takeUntil } from 'rxjs';
import { CardapioRequest } from '../../services/requests/cardapio-request.interface';
import { showSuccessMessage } from '../../../../../../../utils/message.utils';

@Component({
  selector: 'cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrl: './cardapio-form.component.scss',
})
export class CardapioFormComponent implements OnInit, OnDestroy {
  buttonLabel = 'Nova compra';
  subtitle = 'Registre a sua nova compra';
  icone = 'pi pi-plus-circle';
  labelCancel = 'Cancelar';
  options!: KeyValueItem[];
  loading = false;
  form!: FormGroup;
  formUtils!: FormUtils;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _service: CardapioService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', Validators.required],
      quantidade: ['', Validators.required],
      fornecedor: ['', Validators.required],
      preco: ['', Validators.required],
      validade: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    this.formUtils = new FormUtils(this.form);
  }

  save(): void {
    const request: CardapioRequest = this.form.getRawValue();
    this.adicionar(request);
  }
  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private adicionar(request: CardapioRequest) {
    this.loading = true;
    this._service
      .adicionar(request)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res) => {},
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          showSuccessMessage(
            this._messageService,
            'Compra adicionada com sucesso!'
          );
        },
      });
  }
}
