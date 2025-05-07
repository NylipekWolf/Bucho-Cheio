import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { ProfileFilterRequest } from '../../services/requests/profile-filter-request.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings-profile-filter',
  templateUrl: './settings-profile-filter.component.html',
  styleUrl: './settings-profile-filter.component.scss',
})
export class SettingsProfileFilterComponent implements OnInit, OnDestroy {
  @Output() filterOutput = new EventEmitter<ProfileFilterRequest>();

  activatedOptions: KeyValueItem[] = [
    { key: true, value: 'Active' },
    { key: false, value: 'Inactive' },
  ];

  storeOptions: KeyValueItem[] = [];

  form!: FormGroup;

  storeLoading = false;

  private _unsub$ = new Subject<void>();

  constructor(private readonly _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      profileName: [''],
      store: [null],
      activated: [null],
    });

    this.storeLoading = true;
  }

  filter(): void {
    const profileName = this.form.get('profileName')?.value;
    const store = this.form.get('store')?.value as KeyValueItem;
    const activated = this.form.get('activated')?.value as KeyValueItem;

    const request: ProfileFilterRequest = {
      page: 1,
    };

    if (profileName) {
      request.profileName = profileName;
    }

    if (store) {
      request.storeId = store.key;
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
