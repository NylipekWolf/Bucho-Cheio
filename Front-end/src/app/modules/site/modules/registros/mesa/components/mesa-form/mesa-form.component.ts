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
import { MesaService } from '../../services/mesa.service';
import { Subject, takeUntil } from 'rxjs';
import { MesaRequest } from '../../services/requests/mesa-request.interface';
import { showSuccessMessage } from '../../../../../../../utils/message.utils';
import { MesaResponse } from '../../services/responses/mesa-response.interface';

@Component({
  selector: 'mesa-form',
  templateUrl: './mesa-form.component.html',
  styleUrl: './mesa-form.component.scss',
})
export class MesaFormComponent implements OnInit, OnDestroy {
  @Output() closeOutput = new EventEmitter<MesaResponse>();
  @Input() mesaSelecionada!: MesaResponse | undefined;
  buttonLabel!: string;
  subtitle!: string;
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
    private readonly _service: MesaService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      quantidade: [1, Validators.required],
    });
    this.formUtils = new FormUtils(this.form);
    this.buttonLabel = this.mesaSelecionada
      ? 'Mudar a quantidade lugares'
      : 'Nova mesa';
    this.subtitle = this.mesaSelecionada
      ? 'Altere a quantidade lugares'
      : 'Registre a sua nova mesa';
  }

  save(): void {
    const request: MesaRequest = {
      quantidade_de_lugares: this.form.get('quantidade')?.value,
    };
    if (this.mesaSelecionada) request.id = this.mesaSelecionada.id;
    this.mesaSelecionada
      ? this.quantidadeLugares(request)
      : this.adicionar(request);
  }
  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private adicionar(request: MesaRequest) {
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
            'Mesa adicionada com sucesso!'
          );
        },
      });
  }
  private quantidadeLugares(request: MesaRequest) {
    this.loading = true;
    this._service
      .quantidadeLugares(request)
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
            'Quantidade de lugares alterado com sucesso!'
          );
        },
      });
  }
}
