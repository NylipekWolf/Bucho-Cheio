import { ProfileResponse } from './../../services/responses/profile-response.interface';
import { ProfileRequest } from './../../services/requests/profile-request.interface';
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
import { MenuItem, MessageService, PrimeIcons, TreeNode } from 'primeng/api';
import { ProfileService } from '../../services/profile.service';
import { Subject, takeUntil } from 'rxjs';
import { FunctionalityService } from '../../services/functionalities.service';
import { FunctionalityResponse } from '../../services/responses/functionality-response.interface';
import { findMenuIcon } from '../../../../../../../utils/menu.utils';
import {
  showSuccessMessage,
  showWarningMessage,
} from '../../../../../../../utils/message.utils';

@Component({
  selector: 'app-settings-profile-form',
  templateUrl: './settings-profile-form.component.html',
  styleUrl: './settings-profile-form.component.scss',
})
export class SettingsProfileFormComponent implements OnInit, OnDestroy {
  @Input() editProfile = false;
  @Input() breadcrumbHome!: MenuItem;
  @Input() breadcrumb: MenuItem[] = [];
  @Input() openForm = false;
  @Input() profileSelected!: ProfileResponse;
  @Output() closeForm = new EventEmitter<ProfileResponse>();

  form!: FormGroup;
  formUtils!: FormUtils;

  label!: string;
  subtitle!: string;

  functionalities: TreeNode[] = [];
  functionalitiesSelected: TreeNode[] = [];

  storeOptions: KeyValueItem[] = [];

  functionalitiesLoading = false;
  storeLoading = false;

  loading = false;

  private _unsub$ = new Subject<void>();

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _messageService: MessageService,
    private readonly _profileService: ProfileService,
    private readonly _functionalityService: FunctionalityService
  ) {}

  ngOnInit(): void {
    this.breadcrumb = [...this.breadcrumb];

    this.form = this._formBuilder.group({
      profileName: ['', Validators.required],
      store: [null, Validators.required],
    });
    this.formUtils = new FormUtils(this.form);

    this.buildAllFunctionalitiesAvailable();

    if (this.editProfile) {
      this.label = 'Edit profile';
      this.subtitle = 'Fill in the details below to edit a profile';
      this.breadcrumb.push(
        {
          label: this.label,
        },
        { label: `#${this.profileSelected.id}` }
      );

      this.searchSelectedFunctionalities();
    } else {
      this.label = 'New profile';
      this.subtitle = 'Fill in the details below to register a new profile';
      this.breadcrumb.push({
        label: this.label,
      });
    }
  }

  close(response?: ProfileResponse): void {
    this.openForm = false;
    this.closeForm.emit(response);
  }

  save(): void {
    if (this.form.invalid) {
      showWarningMessage(
        this._messageService,
        'Please check if all fields required are filled.'
      );
      return;
    }
    if (this.functionalitiesSelected.length <= 0) {
      showWarningMessage(
        this._messageService,
        'At least one feature is required.'
      );
      return;
    }

    const profileName = this.form.get('profileName')?.value as string;
    const storeId = this.form.get('store')?.value.key as number;
    const functionalitiesId = this.functionalitiesSelected.map(
      (f) => new Number(f.key) as number
    );

    let request: ProfileRequest = {
      name: profileName,
      storeId: storeId,
      functionalitiesId: functionalitiesId,
    };

    this.loading = true;

    if (this.editProfile) {
      request.id = this.profileSelected.id;
      this._profileService
        .update(request)
        .pipe(takeUntil(this._unsub$))
        .subscribe({
          next: (res: ProfileResponse) => {
            showSuccessMessage(
              this._messageService,
              'This item has been updated successfully'
            );
            this.profileSelected.name = res.name;
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
      this._profileService
        .insert(request)
        .pipe(takeUntil(this._unsub$))
        .subscribe({
          next: (res: ProfileResponse) => {
            showSuccessMessage(
              this._messageService,
              'A new item has been inserted successfully'
            );
            this.close(res);
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

  ngOnDestroy(): void {
    this._unsub$.next();
    this._unsub$.complete();
  }

  private searchSelectedFunctionalities(): void {
    this._profileService
      .functionalitiesId(this.profileSelected.id)
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: number[]) => {
          this.functionalitiesSelected = res.map((n) => {
            return {
              key: `${n}`,
            };
          });
        },
        error: () => {
          this.functionalitiesLoading = false;
        },
        complete: () => {
          this.functionalitiesLoading = false;
        },
      });
  }

  private buildAllFunctionalitiesAvailable(): void {
    this.functionalitiesLoading = true;

    this._functionalityService
      .search()
      .pipe(takeUntil(this._unsub$))
      .subscribe({
        next: (res: FunctionalityResponse[]) => {
          this.buildFunctionalitiesTreeNode(res);
        },
        error: () => {
          this.functionalitiesLoading = false;
        },
        complete: () => {
          this.functionalitiesLoading = false;
        },
      });
  }

  private buildFunctionalitiesTreeNode(
    response: FunctionalityResponse[]
  ): void {
    this.functionalities = [];
    const treeNode = response
      .sort((a, b) => a.assortment - b.assortment)
      .map((r) => {
        return this.createTreeNodeItem(r);
      });
    this.functionalities = treeNode;
  }

  private createTreeNodeItem(
    item: FunctionalityResponse,
    isLeaf = false
  ): TreeNode {
    const treeNodeItem: TreeNode = {
      key: `${item.id}`,
      label: item.name,
      icon: isLeaf ? PrimeIcons.FILE : findMenuIcon(item.name),
      children: item.children
        ? this.createTreeNodeChildrenItem(item)
        : undefined,
    };

    return treeNodeItem;
  }

  private createTreeNodeChildrenItem(item: FunctionalityResponse): TreeNode[] {
    const children = item.children;
    const treeNode = children
      .sort((a, b) => a.assortment - b.assortment)
      .map((c) => {
        return c.children
          ? this.createTreeNodeItem(c)
          : this.createTreeNodeItem(c, true);
      });
    return treeNode;
  }

  private disableStore(): void {
    this.form.get('store')?.disable();
  }
}
