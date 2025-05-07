import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './mesa.component.html',
  styleUrl: './mesa.component.scss',
})
export class MesaComponent implements OnInit, OnDestroy {
  private _unsub$ = new Subject<void>();
  formSearch!: FormGroup;
  constructor(private readonly _formBuider: FormBuilder) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
