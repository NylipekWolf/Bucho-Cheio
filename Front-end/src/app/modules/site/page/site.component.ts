import { initialStateProfile } from './../../../ngrx/app.reducers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreDropDownItem } from '@shared/components/store-dropdown/interfaces/store-dropdown-item.interface';
import { MenuItem, PrimeIcons } from 'primeng/api';
import {
  logoutDefaultSignIn,
  profileSelected,
} from '../../../ngrx/app.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectProfile, selectUserInfo } from '../../../ngrx/app.selectors';
import {
  MenuModel,
  ProfileModel,
  UserInfoModel,
} from '../../../ngrx/app.models';
import { Router } from '@angular/router';
import { findMenuIcon } from '../../../utils/menu.utils';

const imgSelected = './../../../assets/images/brand/brand-44x44.png';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrl: './site.component.scss',
})
export class SiteComponent implements OnInit, OnDestroy {
  profileSelected: ProfileModel = initialStateProfile;

  stores: StoreDropDownItem[] = [];
  storeSelected!: StoreDropDownItem;

  menu: MenuItem[] = [];
  userInfoMenu!: MenuItem[];

  employerName!: string;
  employerRole!: string;

  userInfo!: UserInfoModel;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _store: Store,
    private readonly _router: Router
  ) {}

  ngOnInit(): void {
    this._store
      .pipe(select(selectProfile))
      .pipe(takeUntil(this._unsub$))
      .subscribe((profileSelected: ProfileModel) => {
        if (profileSelected) {
          this.profileSelected = profileSelected;
          this.employerRole = profileSelected.name;
        }
      });

    this.userInfoMenu = [
      {
        label: 'Sign out',
        icon: PrimeIcons.SIGN_OUT,
        command: () => this._store.dispatch(logoutDefaultSignIn()),
      },
    ];
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
