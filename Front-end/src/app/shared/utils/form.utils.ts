import { AbstractControl, FormGroup } from '@angular/forms';

export class FormUtils {
  constructor(private readonly _form: FormGroup) {}

  private get f(): { [key: string]: AbstractControl } {
    return this._form.controls;
  }

  isRequired(field: string): boolean {
    return this.f[field].touched && this.f[field].errors?.['required'];
  }

  isPatternInvalid(field: string): boolean {
    return this.f[field].touched && this.f[field].errors?.['pattern'];
  }
}
