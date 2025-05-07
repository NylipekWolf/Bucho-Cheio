import { ProfileResponse } from './../../../settings-profile/services/responses/profile-response.interface';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListTemplateItem } from '@shared/components/templates/list-template/interfaces/list-template-item.interface';
import { FormUtils } from '@shared/utils/form.utils';
import { KeyValueItem } from '@shared/utils/interfaces/keyvalue.interface';
import { itemHasBeenAdded } from '@shared/utils/message.utils';
import { MessageService } from 'primeng/api';
import { ProfileService } from '../../../settings-profile/services/profile.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-settings-user-profile',
  templateUrl: './settings-user-profile.component.html',
  styleUrl: './settings-user-profile.component.scss',
})
export class SettingsUserProfileComponent implements OnInit, OnDestroy {
  @Input() profiles: ProfileResponse[] = [];
  @Output() profilesOutput = new EventEmitter<ProfileResponse[]>();
  form!: FormGroup;
  listTemplateItem: ListTemplateItem[] = [];
  formUtils!: FormUtils;
  profileOptions: KeyValueItem[] = [];
  profileLoading = false;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      profile: [null, Validators.required],
    });
    this.formUtils = new FormUtils(this.form);

    this.searchProfiles();

    if (this.profiles) {
      this.listTemplateItem = this.profiles.map((p) => {
        return this.createListTemplateItem(p);
      });
    }
  }

  addItem(): void {
    if (this.form.invalid) {
      return;
    }

    const profile = this.form.get('profile')?.value.key;

    const item = this.createListTemplateItem(profile);

    var hasItem = this.listTemplateItem.find((i) => i.hash === item.hash);

    if (hasItem) {
      itemHasBeenAdded(this._messageService);
      return;
    }

    this.listTemplateItem.push(item);
    this.updateProfiles();
    this.form.reset();
  }

  delItem(index: any): void {
    this.listTemplateItem.splice(index, 1);
    this.updateProfiles();
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private searchProfiles(): void {
    this.profileLoading = true;

    this._profileService
      .search({ page: 1, size: 1000 })
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: ProfileResponse[]) => {
          this.profileOptions = res.map((resp) => {
            const store = resp.store;
            const profileName = resp.name;
            const descr = store ? `${profileName} | ${store}` : profileName;
            return { key: resp, value: descr };
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
  private updateProfiles(): void {
    const profiles = this.listTemplateItem.map(
      (t) => t.item as ProfileResponse
    );
    this.profilesOutput.emit(profiles);
  }

  private createListTemplateItem(resp: ProfileResponse): ListTemplateItem {
    const store = resp.store;
    const profileName = resp.name;
    const descr = store ? `${profileName} | ${store}` : profileName;

    const item: ListTemplateItem = {
      text: `${descr}`,
      description: ``,
      value: '',
      item: resp,
      hash: `${descr}`,
    };
    return item;
  }
}
