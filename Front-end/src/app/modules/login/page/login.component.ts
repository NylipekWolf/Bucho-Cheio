import { profileSelected } from './../../../ngrx/app.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import {
  selectLoading,
  selectUserInfo,
  selectUserLogged,
} from '../../../ngrx/app.selectors';
import { loginDsi } from '../../../ngrx/app.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  loading = false;
  userLogged = false;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _store: Store,
    private readonly _formBuilder: FormBuilder,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this._store
      .pipe(select(selectLoading))
      .pipe(takeUntil(this._unsub$))
      .subscribe((loading) => (this.loading = loading));

    this._store
      .pipe(select(selectUserLogged))
      .pipe(takeUntil(this._unsub$))
      .subscribe((userLogged) => {
        if (userLogged) {
          this.userLogged = userLogged;

          this._store
            .pipe(select(selectUserInfo))
            .pipe(takeUntil(this._unsub$))
            .subscribe((userInfo) => {
              if (userInfo) {
                const profile = userInfo.profiles[0]; // choose the first profile from list
                if (profile) {
                  this._store.dispatch(
                    profileSelected({ profileSelected: profile })
                  );
                }
              }
            });

          this._router.navigateByUrl('/site/dashboard');
        }
      });
  }

  login(): void {
    this._store.dispatch(
      loginDsi({
        request: this.form.getRawValue(),
      })
    );
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
