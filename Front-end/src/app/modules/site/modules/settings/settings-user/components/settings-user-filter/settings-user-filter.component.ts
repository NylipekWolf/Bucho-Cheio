import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../../settings-profile/services/profile.service';
import { SettingsUserFilterRequest } from '../../services/requests/settings-user-filter-request.interface';
import { ProfileResponse } from '../../../settings-profile/services/responses/profile-response.interface';

@Component({
  selector: 'app-settings-user-filter',
  templateUrl: './settings-user-filter.component.html',
  styleUrl: './settings-user-filter.component.scss',
})
export class SettingsUserFilterComponent implements OnInit, OnDestroy {
  @Output() filterOutput = new EventEmitter<SettingsUserFilterRequest>();

  activatedOptions: KeyValueItem[] = [
    { key: true, value: 'Active' },
    { key: false, value: 'Inactive' },
  ];

  profileOptions: KeyValueItem[] = [];

  form!: FormGroup;

  profileLoading = false;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      userName: [''],
      fullName: [''],
      profile: [null],
      activated: [null],
    });

    this.profileLoading = true;

    this._profileService
      .search()
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: ProfileResponse[]) => {
          this.profileOptions = res.map((p) => {
            const value = p.store ? `${p.name} | ${p.store}` : p.name;
            return { key: p.id, value: value };
          });
        },
        error: () => {
          this.profileLoading = false;
        },
        complete: () => {
          this.profileLoading = false;
        },
      });
  }

  filter(): void {
    const userName = this.form.get('userName')?.value;
    const fullName = this.form.get('fullName')?.value;
    const profile = this.form.get('profile')?.value as KeyValueItem;
    const activated = this.form.get('activated')?.value as KeyValueItem;

    const request: SettingsUserFilterRequest = {
      page: 1,
    };

    if (userName) {
      request.userName = userName;
    }

    if (fullName) {
      request.fullName = fullName;
    }

    if (profile) {
      request.profileId = profile.key;
    }

    if (activated) {
      request.activated = activated.key;
    }

    this.filterOutput.emit(request);
  }

  reset(): void {
    this.form.reset();
    this.filterOutput.emit({ page: 1 });
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
