import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form.utils';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { MenuItem, MessageService } from 'primeng/api';
import { IngredienteService } from '../../services/ingrediente.service';
import { Subject, takeUntil } from 'rxjs';
import { IngredienteRequest } from '../../services/requests/ingrediente-request.interface';
import { IngredienteResponse } from '../../services/responses/ingrediente-response.interface';

@Component({
  selector: 'ingrediente-form',
  templateUrl: './ingrediente-form.component.html',
  styleUrl: './ingrediente-form.component.scss',
})
export class IngredienteFormComponent implements OnInit, OnDestroy {
  @Output() closeOutput = new EventEmitter<IngredienteResponse>();
  @Input() mesaSelecionada!: IngredienteResponse | undefined;
  buttonLabel = 'Novo ingrediente';
  subtitle = 'Registre o novo ingrediente';
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
    private readonly _registerCustomer: IngredienteService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: [''],
      quantidade: ['', Validators.required],
      fornecedor: ['', Validators.required],
      preco: [''],
    });
    this.formUtils = new FormUtils(this.form);
  }

  save(): void {}
  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
  private insert(request: IngredienteRequest): void {}
  private updated(request: IngredienteRequest): void {}
}
