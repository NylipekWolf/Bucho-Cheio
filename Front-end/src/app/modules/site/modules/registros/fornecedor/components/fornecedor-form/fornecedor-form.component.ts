import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { MenuItem, MessageService } from 'primeng/api';
import { FornecedorService } from '../../services/fornecedor.service';
import { Subject, takeUntil } from 'rxjs';
import { FornecedorRequest } from '../../services/requests/fornecedor-request.interface';
import { showSuccessMessage } from '../../../../../../../utils/message.utils';
import { FornecedorContatosResponse } from '../../services/responses/fornecedor-contatos-response.interface';
import { FornecedorContatoRequest } from '../../services/requests/fornecedor-contato-request.interface';
import { FornecedorResponse } from '../../services/responses/fornecedor-response.interface';

@Component({
  selector: 'fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.scss',
})
export class FornecedorFormComponent implements OnInit, OnDestroy {
  @Output() closeOutput = new EventEmitter<FornecedorResponse>();
  buttonLabel = 'Nova fornecedor';
  subtitle = 'Registre um novo fornecedor';
  icone = 'pi pi-plus-circle';
  labelCancel = 'Cancelar';
  options!: KeyValueItem[];
  loading = false;
  form!: FormGroup;
  formUtils!: FormUtils;
  loadingContato = false;
  contatos: FornecedorContatoRequest[] = [];

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _service: FornecedorService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      contato: this._formBuilder.group({
        nome: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      }),
    });
    this.formUtils = new FormUtils(this.form);
  }

  save(): void {
    const request: FornecedorRequest = {
      nome: this.form.get('nome')?.value,
      endereco: {
        cep: this.form.get('cep')?.value,
        complemento: this.form.get('complemento')?.value,
        logradouro: this.form.get('logradouro')?.value,
        numero: parseInt(this.form.get('numero')?.value),
      },
      contatos: this.contatos,
    };
    this.adicionar(request);
  }

  adicionarContato(): void {
    this.loadingContato = true;
    const item: FornecedorContatoRequest = this.form
      .get('contato')
      ?.getRawValue();
    if (this.contatos.length == 0) item.principal = true;
    this.contatos.push(item);
    this.loadingContato = false;
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private adicionar(request: FornecedorRequest) {
    this.loading = true;
    this._service
      .adicionar(request)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res) => {
          this.closeOutput.emit(res);
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          showSuccessMessage(
            this._messageService,
            'Fornecedor adicionada com sucesso!'
          );
        },
      });
  }
}
