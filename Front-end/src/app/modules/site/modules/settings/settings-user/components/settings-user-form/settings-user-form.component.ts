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
import { MenuItem, MessageService } from 'primeng/api';
import { SettingsUserResponse } from '../../services/responses/settings-user-response.interface';
import { Subject, takeUntil } from 'rxjs';
import { ProfileResponse } from '../../../settings-profile/services/responses/profile-response.interface';
import {
  showSuccessMessage,
  showWarningMessage,
} from '../../../../../../../utils/message.utils';
import { SettingsUserRequest } from '../../services/requests/settings-user-request.interface';
import { SettingsUserService } from '../../services/settings-user.service';
import { profileView } from '../../page/settings-user.component';

@Component({
  selector: 'app-settings-user-form',
  templateUrl: './settings-user-form.component.html',
  styleUrl: './settings-user-form.component.scss',
})
export class SettingsUserFormComponent implements OnInit, OnDestroy {
  @Input() editUser = false;
  @Input() breadcrumbHome!: MenuItem;
  @Input() breadcrumb: MenuItem[] = [];
  @Input() openForm = false;
  @Input() userSelected!: SettingsUserResponse;
  @Output() closeForm = new EventEmitter<SettingsUserResponse>();
  form!: FormGroup;
  formUtils!: FormUtils;

  label!: string;
  subtitle!: string;

  loading = false;

  profilesSelected: ProfileResponse[] = [];

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _settingsUserService: SettingsUserService
  ) {}

  ngOnInit(): void {
    this.breadcrumb = [...this.breadcrumb];

    this.form = this._formBuilder.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      userName: [null, Validators.required],
      email: ['', Validators.required],
      password: [
        null,
        [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)],
      ],
    });
    this.formUtils = new FormUtils(this.form);

    if (this.editUser) {
      this.label = 'Edit user';
      this.subtitle = 'Fill in the details below to edit a user';
      this.breadcrumb.push(
        {
          label: this.label,
        },
        { label: `#${this.userSelected.id}` }
      );

      this.form.patchValue({
        fullName: this.userSelected.fullName,
        phone: this.userSelected.phone,
        userName: this.userSelected.userName,
        email: this.userSelected.email,
      });

      this.profilesSelected = this.userSelected.profiles;
    } else {
      this.label = 'New user';
      this.subtitle = 'Fill in the details below to register a new user';
      this.breadcrumb.push({
        label: this.label,
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      showWarningMessage(
        this._messageService,
        'Please check if all fields required are filled.'
      );
      return;
    }
    if (this.profilesSelected.length <= 0) {
      showWarningMessage(
        this._messageService,
        'At least one profile is required.'
      );
      return;
    }

    const fullName = this.form.get('fullName')?.value as string;
    const phone = this.form.get('phone')?.value as string;
    const email = this.form.get('email')?.value as string;
    const userName = this.form.get('userName')?.value as string;
    const password = this.form.get('password')?.value as string;

    const profilesId = this.profilesSelected.map((f) => f.id);

    let request: SettingsUserRequest = {
      fullName,
      phone,
      email,
      userName,
      password,
      profilesId,
    };

    this.loading = true;

    if (this.editUser) {
      request.id = this.userSelected.id;
      this._settingsUserService
        .update(request)
        .pipe(takeUntil(this._unsub$))
        .subscribe({
          next: (res: SettingsUserResponse) => {
            showSuccessMessage(
              this._messageService,
              'This item has been updated successfully'
            );
            this.userSelected.fullName = res.fullName;
            this.userSelected.phone = res.phone;
            this.userSelected.email = res.email;
            this.userSelected.profiles = res.profiles;
            this.userSelected.userName = res.userName;
            this.userSelected.profilesView = profileView(res);
            this.close();
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else {
      this._settingsUserService
        .insert(request)
        .pipe(takeUntil(this._unsub$))
        .subscribe({
          next: (r: SettingsUserResponse) => {
            showSuccessMessage(
              this._messageService,
              'A new item has been inserted successfully'
            );
            var customResponse: SettingsUserResponse = {
              id: r.id,
              userName: r.userName,
              fullName: r.fullName,
              phone: r.phone,
              profiles: r.profiles,
              profilesView: profileView(r),
              activated: r.activated,
              email: r.email,
            };

            this.close(customResponse);
          },
          error: () => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
    }
  }

  close(response?: SettingsUserResponse): void {
    this.openForm = false;
    this.closeForm.emit(response);
  }

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }
}
