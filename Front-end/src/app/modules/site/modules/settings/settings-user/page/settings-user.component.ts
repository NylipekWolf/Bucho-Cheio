import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableTemplateEnum } from '@shared/components/templates/table-template/enums/table-template.enum';
import { TableTemplateColumn } from '@shared/components/templates/table-template/interfaces/table-template-column.interface';
import { itemMustBeSelected } from '@shared/utils/message.utils';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SettingsUserResponse } from '../services/responses/settings-user-response.interface';
import { SettingsUserService } from '../services/settings-user.service';
import { SettingsUserFilterRequest } from '../services/requests/settings-user-filter-request.interface';
import {
  showSuccessMessage,
  showWarningMessage,
} from '../../../../../../utils/message.utils';

export function profileView(r: SettingsUserResponse): string {
  const profileView = r.profiles
    .map((p) => {
      return p.store ? `${p.name} (${p.store})` : p.name;
    })
    .join(', ');
  return profileView;
}

@Component({
  selector: 'app-settings-user',
  templateUrl: './settings-user.component.html',
  styleUrl: './settings-user.component.scss',
})
export class SettingsUserComponent implements OnInit, OnDestroy {
  userSelected: any;
  openForm = false;
  editUser = false;
  loading = false;
  currentPage = 1;
  defaultPageSize = 10;

  breadcrumbHome: MenuItem = {
    icon: PrimeIcons.COG,
    routerLink: '/site/user',
  };

  breadcrumb: MenuItem[] = [
    {
      label: 'Settings',
    },
    {
      label: 'User',
    },
  ];

  usersCols: TableTemplateColumn[] = [
    { field: 'id', header: 'User ID', type: TableTemplateEnum.HIDE },
    { field: 'userName', header: 'User name' },
    { field: 'fullName', header: 'Full name' },
    { field: 'phone', header: 'Phone' },
    { field: 'email', header: 'Email', type: TableTemplateEnum.HIDE },
    {
      field: 'profiles',
      header: 'Profiles',
      type: TableTemplateEnum.HIDE,
    },
    {
      field: 'profilesView',
      header: 'Profiles',
    },
    {
      field: 'activated',
      header: 'Activated',
      type: TableTemplateEnum.ACTIVATION,
    },
  ];

  users: SettingsUserResponse[] = [];

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _messageService: MessageService,
    private readonly _settingsUserService: SettingsUserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.users = [];
    this.search({ size: this.defaultPageSize });
  }

  search(filter: SettingsUserFilterRequest, moreItems?: boolean): void {
    this.loading = true;
    this._settingsUserService
      .search(filter)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: SettingsUserResponse[]) => {
          res = this.customResponse(res);

          if (moreItems) {
            if (res.length > 0) {
              this.users = this.users.concat(res);
            } else {
              showWarningMessage(
                this._messageService,
                `There's no more items to load`
              );
            }
          } else {
            this.currentPage = 1;
            this.users = res;
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

  loadMore(): void {
    this.currentPage++;
    this.search({ page: this.currentPage, size: this.defaultPageSize }, true);
  }

  prepareNewUser(): void {
    this.editUser = false;
    this.openForm = true;
  }

  prepareEditUser(): void {
    if (!this.userSelected) {
      itemMustBeSelected(this._messageService);
      return;
    }
    this.editUser = true;
    this.openForm = true;
  }

  activateDeactivate(): void {
    if (!this.userSelected) {
      showWarningMessage(this._messageService, 'User selected is required');
    }

    this.loading = true;

    this._settingsUserService
      .activateDeactivate(this.userSelected.id)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: () => {
          showSuccessMessage(
            this._messageService,
            'This item has been updated successfully'
          );
          this.userSelected.activated = !this.userSelected.activated;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  closeForm($event?: SettingsUserResponse): void {
    if ($event) {
      this.users.push($event);
    }
    this.openForm = false;
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private customResponse(resp: SettingsUserResponse[]): SettingsUserResponse[] {
    const customResponse = resp.map((r) => {
      var resp: SettingsUserResponse = {
        id: r.id,
        userName: r.userName,
        fullName: r.fullName,
        phone: r.phone,
        profiles: r.profiles,
        profilesView: profileView(r),
        activated: r.activated,
        email: r.email,
      };
      return resp;
    });
    return customResponse;
  }
}
