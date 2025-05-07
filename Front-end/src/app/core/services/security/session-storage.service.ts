import { Injectable } from '@angular/core';

const keys = {
  dsiKey: 'dsiKey',
  profile: 'pfl',
};

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  hasDsiTkn(): boolean {
    return !!this.getDsiTkn();
  }

  setDsiTkn(tkn: string): void {
    window.sessionStorage.setItem(keys.dsiKey, tkn);
  }

  getDsiTkn(): string | null {
    return window.sessionStorage.getItem(keys.dsiKey);
  }

  removeDsiTkn(): void {
    window.sessionStorage.removeItem(keys.dsiKey);
  }

  hasProfile(): boolean {
    return !!this.getProfile();
  }

  setProfile(id: number): void {
    window.sessionStorage.setItem(keys.profile, `${id}`);
  }

  getProfile(): number {
    return Number(window.sessionStorage.getItem(keys.profile));
  }

  removeProfile(): void {
    window.sessionStorage.removeItem(keys.profile);
  }
}
