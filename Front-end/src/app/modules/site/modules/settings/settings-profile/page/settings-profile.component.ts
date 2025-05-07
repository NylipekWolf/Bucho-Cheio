import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableTemplateEnum } from '@shared/components/templates/table-template/enums/table-template.enum';
import { TableTemplateColumn } from '@shared/components/templates/table-template/interfaces/table-template-column.interface';
import { itemMustBeSelected } from '@shared/utils/message.utils';
import { MenuItem, MessageService, PrimeIcons } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../services/profile.service';
import { ProfileResponse } from '../services/responses/profile-response.interface';
import { ProfileFilterRequest } from '../services/requests/profile-filter-request.interface';
import {
  showSuccessMessage,
  showWarningMessage,
} from '../../../../../../utils/message.utils';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.scss',
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  openForm = false;
  editProfile = false;
  loading = false;
  currentPage = 1;
  defaultPageSize = 10;

  breadcrumbHome: MenuItem = {
    icon: PrimeIcons.COG,
    routerLink: '/site/profile',
  };

  breadcrumb: MenuItem[] = [
    {
      label: 'Settings',
    },
    {
      label: 'Profile',
    },
  ];

  profilesCols: TableTemplateColumn[] = [
    { field: 'id', header: 'Profile ID', type: TableTemplateEnum.HIDE },
    { field: 'profileName', header: 'Profile name' },
    { field: 'store', header: 'Store' },
    {
      field: 'activated',
      header: 'Activated',
      type: TableTemplateEnum.ACTIVATION,
    },
  ];

  profiles: ProfileResponse[] = [];
  profileSelected!: ProfileResponse;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _messageService: MessageService,
    private readonly _profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.profiles = [];
    this.search({ size: this.defaultPageSize });
  }

  search(filter: ProfileFilterRequest, moreItems?: boolean): void {
    this.loading = true;
    this._profileService
      .search(filter)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: ProfileResponse[]) => {
          if (moreItems) {
            if (res.length > 0) {
              this.profiles = this.profiles.concat(res);
            } else {
              showWarningMessage(
                this._messageService,
                `There's no more items to load`
              );
            }
          } else {
            this.currentPage = 1;
            this.profiles = res;
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

  prepareNewProfile(): void {
    this.editProfile = false;
    this.openForm = true;
  }

  prepareEditProfile(): void {
    if (!this.profileSelected) {
      itemMustBeSelected(this._messageService);
      return;
    }
    this.editProfile = true;
    this.openForm = true;
  }

  activateDeactivate(): void {
    if (!this.profileSelected) {
      showWarningMessage(this._messageService, 'Profile selected is required');
    }

    this.loading = true;

    this._profileService
      .activateDeactivate(this.profileSelected.id)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: () => {
          showSuccessMessage(
            this._messageService,
            'This item has been updated successfully'
          );
          this.profileSelected.activated = !this.profileSelected.activated;
        },
        error: () => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  closeForm($event?: ProfileResponse): void {
    if ($event) {
      this.profiles.push($event);
    }
    this.openForm = false;
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
